# Environment Strategy

Per 11_Deployment_And_Operations.docx, Section 2.

## Environments

1. Development — local machine, npm run dev, points at a local or personal dev Supabase project.
2. Staging — mirrors production configuration exactly, deployed from develop. Used for pre-production verification and UAT.
3. Production — live school operations, deployed from main only after staging sign-off.

## Isolation rules

- Each environment has its own Supabase project (own database, own auth, own storage buckets) — never share a database across environments.
- Each environment has its own set of secrets — a staging key must never be valid in production and vice versa.
- Each environment has its own Paystack/Hubtel keys — always use test-mode payment credentials in development and staging.

## What still needs to be created

- [ ] Supabase project: edutrack-dev (or personal dev project per developer)
- [ ] Supabase project: edutrack-staging
- [ ] Supabase project: edutrack-production
- [ ] Vercel project linked to this repository, with three environments configured (Development/Preview/Production) matching the branches in docs/BRANCHING_STRATEGY.md
- [ ] Paystack test-mode keys for development/staging; live keys for production only
