CREATE TABLE schools (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_code         TEXT        NOT NULL UNIQUE,
    school_name         TEXT        NOT NULL,
    school_type         TEXT,
    ownership_type      TEXT,
    country             TEXT        NOT NULL DEFAULT 'Ghana',
    is_active           BOOLEAN     NOT NULL DEFAULT TRUE,
    is_archived         BOOLEAN     NOT NULL DEFAULT FALSE,
    subscription_status TEXT        NOT NULL DEFAULT 'trial',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ,
    deleted_by          UUID
);

CREATE TABLE roles (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    role_code           TEXT        NOT NULL UNIQUE,
    role_name           TEXT        NOT NULL UNIQUE,
    role_description    TEXT,
    role_scope          TEXT        NOT NULL DEFAULT 'school',
    is_system_role      BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE permissions (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    permission_code     TEXT        NOT NULL UNIQUE,
    permission_name     TEXT        NOT NULL,
    module_name         TEXT        NOT NULL,
    description         TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE role_permissions (
    role_id             UUID        NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id       UUID        NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE subscription_plans (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_name           TEXT        NOT NULL,
    plan_code           TEXT        NOT NULL UNIQUE,
    description         TEXT,
    monthly_price       NUMERIC(12,2),
    annual_price        NUMERIC(12,2),
    max_students        INTEGER,
    max_staff           INTEGER,
    max_branches        INTEGER,
    trial_days          INTEGER     NOT NULL DEFAULT 30,
    is_active           BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE plan_features (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id             UUID        NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_key         TEXT        NOT NULL,
    feature_name        TEXT        NOT NULL,
    feature_enabled     BOOLEAN     NOT NULL DEFAULT TRUE,
    UNIQUE (plan_id, feature_key)
);

CREATE TABLE plan_limits (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id             UUID        NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
    limit_key           TEXT        NOT NULL,
    limit_value         INTEGER,
    UNIQUE (plan_id, limit_key)
);

CREATE TABLE tax_configurations (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    country             TEXT        NOT NULL DEFAULT 'Ghana',
    tax_name            TEXT        NOT NULL,
    tax_type            TEXT        NOT NULL DEFAULT 'VAT',
    tax_rate            NUMERIC(5,2) NOT NULL,
    is_active           BOOLEAN     NOT NULL DEFAULT TRUE,
    effective_from      DATE,
    effective_to        DATE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE system_settings (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key         TEXT        NOT NULL UNIQUE,
    setting_value       JSONB       NOT NULL,
    description         TEXT,
    updated_by          UUID,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE storage_buckets (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    bucket_name             TEXT        NOT NULL UNIQUE,
    bucket_description      TEXT,
    is_public               BOOLEAN     NOT NULL DEFAULT FALSE,
    max_file_size_mb        INTEGER,
    allowed_file_types      TEXT[],
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ges_report_templates (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name       TEXT        NOT NULL,
    educational_level   TEXT        NOT NULL,
    assessment_type     TEXT        NOT NULL,
    version             TEXT,
    is_active           BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);