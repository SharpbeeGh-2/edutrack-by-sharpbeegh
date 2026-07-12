# Migration Process

We don't use the Supabase CLI's local dev stack (`supabase start`) since it requires Docker, which isn't available on Android. Every schema change is still run through the Supabase Dashboard's SQL Editor — but from now on, every change also gets saved as a numbered file in `supabase/migrations/` in this repo, committed to git, _before_ it's run against the database. The repo is the source of truth for what the schema should look like; the dashboard is just how we apply it on this setup.

## Process for every future schema change

1. Write the SQL.
2. Save it as a new file: `supabase/migrations/NNNN_short_description.sql`, where `NNNN` is the next number in sequence (four digits, zero-padded), matching the order tables must be created in (respecting foreign key dependencies — see `03_Database_Master_Specification.md`'s phase ordering for the full 26-phase sequence).
3. Commit and push that file to git first.
4. Then paste the same SQL into the Supabase Dashboard SQL Editor and run it.
5. If it fails partway, fix the file, and if any statements did partially apply, note that in a comment at the top of the file so the next person (or future you) knows the true state of the live database vs. what's in the file.

## Numbering so far

| File                        | Covers                                                                                                                                                                                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0001_extensions.sql`       | pgcrypto, pg_trgm, unaccent                                                                                                                                                                                                                              |
| `0002_core_tables.sql`      | schools, roles, permissions, role_permissions, subscription_plans, plan_features, plan_limits, tax_configurations, system_settings, storage_buckets, ges_report_templates                                                                                |
| `0003_user_auth_tables.sql` | users, user_profiles, user_roles, user_devices, user_sessions, login_history, password_reset_requests, email_verification_logs, account_locks, user_mfa_settings, user_consents, plus the two deferred foreign keys onto `schools` and `system_settings` |

These three files are backfilled records of what we already ran manually in Task 2 — they reflect the current live state of the `edutrack-dev` database as of Phase 0. Every migration from this point forward gets a new file before it gets run.

## If the CLI ever becomes usable (e.g. developing from a laptop later)

The numbered files in `supabase/migrations/` are already named in the format the Supabase CLI expects, so switching to `supabase db push` later (from a machine with Docker) is a drop-in change, not a rewrite — nothing here is Termux-specific except the workaround for _applying_ them.
