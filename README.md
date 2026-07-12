# EduTrack by SharpbeeGh

Cloud-based, multi-tenant School Management Information System (SMIS) for Ghanaian schools, built and operated by SharpbeeGh.

Canonical naming: EduTrack by SharpbeeGh (formal contexts), EduTrack (UI / space-constrained contexts). Do not use "EduTrack GH," "EduTrack Ghana," or "EduTrackGH" anywhere in code, copy, or commits.

Status: Phase 0, Foundation, in progress

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Router v6, React Hook Form, Zod, React Hot Toast, Recharts
- Backend: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- Payments: Paystack (primary), Hubtel (secondary)
- Hosting: Vercel (frontend), Supabase (backend)
- CI/CD: GitHub Actions

## Repository structure

edutrack-by-sharpbeegh/
.github/workflows/ CI/CD pipelines
docs/ Operational documentation
src/ Frontend application, added in Phase 0 Task 3
supabase/ Migrations, functions, config, added in Phase 0 Task 2
.env.example Client-safe environment variable template
README.md

## Environments

- Development, local feature work, branch feature/*
- Staging, pre-production verification, branch develop
- Production, live school operations, branch main

See docs/ENVIRONMENT_STRATEGY.md and docs/BRANCHING_STRATEGY.md for details.

## Task checklist

- [x] Task 1, Infrastructure Setup, this task
- [ ] Task 2, Supabase Setup
- [ ] Task 3, Frontend Foundation
- [ ] Task 4, Engineering Foundation
- [ ] Task 5, Core Standards

## Domain and hosting

No domain is registered yet. See docs/DOMAIN_SETUP_CHECKLIST.md before Phase 0 sign-off.

## License

Proprietary, SharpbeeGh, all rights reserved.
