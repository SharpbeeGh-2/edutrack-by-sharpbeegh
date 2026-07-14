CREATE TABLE school_memberships (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id           UUID        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id             UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_primary_school   BOOLEAN     NOT NULL DEFAULT FALSE,
    is_active           BOOLEAN     NOT NULL DEFAULT TRUE,
    joined_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    left_at             TIMESTAMPTZ,
    UNIQUE (school_id, user_id)
);

CREATE TABLE school_membership_roles (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id           UUID        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    membership_id       UUID        NOT NULL REFERENCES school_memberships(id) ON DELETE CASCADE,
    role_id             UUID        NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (membership_id, role_id)
);

CREATE TABLE user_invitations (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id           UUID        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    role_id             UUID        NOT NULL REFERENCES roles(id),
    email               TEXT        NOT NULL,
    first_name          TEXT,
    last_name           TEXT,
    invitation_token    TEXT        NOT NULL UNIQUE,
    expires_at          TIMESTAMPTZ NOT NULL,
    accepted_at         TIMESTAMPTZ,
    resent_at           TIMESTAMPTZ,
    created_by          UUID        REFERENCES users(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE school_sequences (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id           UUID        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    sequence_name       TEXT        NOT NULL,
    current_value       BIGINT      NOT NULL DEFAULT 0,
    prefix              TEXT,
    suffix              TEXT,
    pad_length          INTEGER     NOT NULL DEFAULT 5,
    reset_annually      BOOLEAN     NOT NULL DEFAULT FALSE,
    last_reset_year     INTEGER,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (school_id, sequence_name)
);

CREATE TABLE impersonation_sessions (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    impersonator_id     UUID        NOT NULL REFERENCES users(id),
    target_school_id    UUID        NOT NULL REFERENCES schools(id),
    session_mode        TEXT        NOT NULL,
    reason              TEXT        NOT NULL,
    ticket_reference    TEXT,
    started_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at            TIMESTAMPTZ,
    actions_summary     JSONB
);

CREATE TABLE school_leads (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_name         TEXT        NOT NULL,
    contact_name        TEXT        NOT NULL,
    contact_email       TEXT        NOT NULL,
    contact_phone       TEXT,
    region              TEXT,
    school_type         TEXT,
    estimated_students  INTEGER,
    lead_source         TEXT,
    lead_status         TEXT        NOT NULL DEFAULT 'new',
    notes               TEXT,
    assigned_to         UUID        REFERENCES users(id),
    converted_school_id UUID        REFERENCES schools(id),
    converted_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE onboarding_progress (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id           UUID        NOT NULL UNIQUE REFERENCES schools(id) ON DELETE CASCADE,
    profile_completed   BOOLEAN     NOT NULL DEFAULT FALSE,
    branding_completed  BOOLEAN     NOT NULL DEFAULT FALSE,
    academic_year_set   BOOLEAN     NOT NULL DEFAULT FALSE,
    classes_created     BOOLEAN     NOT NULL DEFAULT FALSE,
    subjects_created    BOOLEAN     NOT NULL DEFAULT FALSE,
    staff_invited       BOOLEAN     NOT NULL DEFAULT FALSE,
    students_imported   BOOLEAN     NOT NULL DEFAULT FALSE,
    payment_configured  BOOLEAN     NOT NULL DEFAULT FALSE,
    completed_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);