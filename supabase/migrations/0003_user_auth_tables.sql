CREATE TABLE users (
    id                  UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email               TEXT        NOT NULL UNIQUE,
    username            TEXT        UNIQUE,
    first_name          TEXT        NOT NULL,
    last_name           TEXT        NOT NULL,
    phone               TEXT,
    profile_photo_url   TEXT,
    preferred_language  TEXT        NOT NULL DEFAULT 'en',
    is_active           BOOLEAN     NOT NULL DEFAULT TRUE,
    last_login_at       TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE schools
    ADD CONSTRAINT schools_deleted_by_fkey
    FOREIGN KEY (deleted_by) REFERENCES users(id);

ALTER TABLE system_settings
    ADD CONSTRAINT system_settings_updated_by_fkey
    FOREIGN KEY (updated_by) REFERENCES users(id);

CREATE TABLE user_profiles (
    id                          UUID    PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth               DATE,
    gender                      TEXT,
    nationality                 TEXT,
    national_id_number          TEXT,
    residential_address         TEXT,
    emergency_contact_name      TEXT,
    emergency_contact_phone     TEXT,
    bio                         TEXT,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_roles (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id             UUID        NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by         UUID        REFERENCES users(id),
    assigned_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, role_id)
);

CREATE TABLE user_devices (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_name         TEXT,
    device_type         TEXT,
    browser             TEXT,
    operating_system    TEXT,
    ip_address          TEXT,
    first_seen_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at        TIMESTAMPTZ,
    is_trusted          BOOLEAN     NOT NULL DEFAULT FALSE
);

CREATE TABLE user_sessions (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_name         TEXT,
    browser             TEXT,
    operating_system    TEXT,
    ip_address          TEXT,
    login_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at    TIMESTAMPTZ,
    logout_at           TIMESTAMPTZ
);

CREATE TABLE login_history (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    login_method        TEXT,
    ip_address          TEXT,
    device_id           UUID        REFERENCES user_devices(id),
    login_status        TEXT        NOT NULL,
    failure_reason      TEXT,
    logged_in_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE password_reset_requests (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requested_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at        TIMESTAMPTZ,
    ip_address          TEXT
);

CREATE TABLE email_verification_logs (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    verification_sent_at    TIMESTAMPTZ,
    verified_at             TIMESTAMPTZ,
    status                  TEXT        NOT NULL DEFAULT 'PENDING'
);

CREATE TABLE account_locks (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lock_reason         TEXT        NOT NULL,
    locked_by           UUID        REFERENCES users(id),
    locked_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    unlocked_at         TIMESTAMPTZ,
    unlocked_by         UUID        REFERENCES users(id)
);

CREATE TABLE user_mfa_settings (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    is_enabled          BOOLEAN     NOT NULL DEFAULT FALSE,
    mfa_type            TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_consents (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type        TEXT        NOT NULL,
    consent_version     TEXT        NOT NULL,
    accepted_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address          TEXT
);