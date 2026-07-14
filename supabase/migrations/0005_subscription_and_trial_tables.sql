CREATE TABLE school_subscriptions (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id               UUID        NOT NULL REFERENCES schools(id) ON DELETE RESTRICT,
    plan_id                 UUID        NOT NULL REFERENCES subscription_plans(id),
    subscription_status     TEXT        NOT NULL DEFAULT 'trial',
    billing_cycle           TEXT        NOT NULL DEFAULT 'monthly',
    start_date              DATE        NOT NULL,
    end_date                DATE,
    grace_period_end_date   DATE,
    auto_renew              BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE free_trials (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id               UUID        NOT NULL UNIQUE REFERENCES schools(id) ON DELETE RESTRICT,
    trial_start_date        DATE        NOT NULL,
    trial_end_date          DATE        NOT NULL,
    converted_to_paid       BOOLEAN     NOT NULL DEFAULT FALSE,
    converted_at            TIMESTAMPTZ,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);