CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_first_name           TEXT;
    v_last_name            TEXT;
    v_school_name          TEXT;
    v_school_id            UUID;
    v_membership_id        UUID;
    v_free_plan_id         UUID;
    v_school_owner_role_id UUID;
    v_school_code          TEXT;
BEGIN
    -- Works for both email/password signup (first_name/last_name in metadata)
    -- and Google OAuth (full_name/name instead) — falls back gracefully either way.
    v_first_name := COALESCE(
        NEW.raw_user_meta_data->>'first_name',
        NULLIF(split_part(NEW.raw_user_meta_data->>'full_name', ' ', 1), ''),
        NULLIF(split_part(NEW.raw_user_meta_data->>'name', ' ', 1), ''),
        ''
    );
    v_last_name := COALESCE(
        NEW.raw_user_meta_data->>'last_name',
        NULLIF(substring(NEW.raw_user_meta_data->>'full_name' FROM position(' ' IN NEW.raw_user_meta_data->>'full_name') + 1), ''),
        NULLIF(substring(NEW.raw_user_meta_data->>'name' FROM position(' ' IN NEW.raw_user_meta_data->>'name') + 1), ''),
        ''
    );

    INSERT INTO public.users (id, email, first_name, last_name, profile_photo_url)
    VALUES (
        NEW.id,
        NEW.email,
        v_first_name,
        v_last_name,
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
    )
    ON CONFLICT (id) DO NOTHING;

    v_school_name := NEW.raw_user_meta_data->>'school_name';

    -- Only provision a school if they signed up via the registration form
    -- (school_name present). Google sign-in on the login page, or a future
    -- invited-staff acceptance flow, will not carry this field.
    IF v_school_name IS NOT NULL AND v_school_name <> '' THEN
        v_school_code := 'SCH-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));

        INSERT INTO public.schools (school_code, school_name, subscription_status)
        VALUES (v_school_code, v_school_name, 'trial')
        RETURNING id INTO v_school_id;

        INSERT INTO public.school_memberships (school_id, user_id, is_primary_school)
        VALUES (v_school_id, NEW.id, TRUE)
        RETURNING id INTO v_membership_id;

        SELECT id INTO v_school_owner_role_id FROM public.roles WHERE role_code = 'SCHOOL_OWNER';

        INSERT INTO public.school_membership_roles (school_id, membership_id, role_id)
        VALUES (v_school_id, v_membership_id, v_school_owner_role_id);

        SELECT id INTO v_free_plan_id FROM public.subscription_plans WHERE plan_code = 'FREE';

        INSERT INTO public.school_subscriptions (school_id, plan_id, subscription_status, start_date, end_date)
        VALUES (v_school_id, v_free_plan_id, 'trial', CURRENT_DATE, (CURRENT_DATE + INTERVAL '30 days')::date);

        INSERT INTO public.free_trials (school_id, trial_start_date, trial_end_date)
        VALUES (v_school_id, CURRENT_DATE, (CURRENT_DATE + INTERVAL '30 days')::date);

        INSERT INTO public.onboarding_progress (school_id, profile_completed)
        VALUES (v_school_id, TRUE);
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();