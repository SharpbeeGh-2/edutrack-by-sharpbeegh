# Branching Strategy

Per 11_Deployment_And_Operations.docx, Section 6.

## Branches

| Branch | Purpose | Deploys to |
|---|---|---|
| main | Production-ready code only | Production |
| develop | Integration branch — all feature work merges here first | Staging |
| feature/<name> | One branch per feature/task (e.g. feature/student-admissions) | Preview (Vercel) |
| hotfix/<name> | Emergency production fixes | Production (after approval) |

## Rules

- No direct commits to main. Ever.
- All merges to main and develop happen via Pull Request.
- Every PR requires at least one code review before merge.
- Merge is blocked until the CI pipeline (.github/workflows/ci.yml) passes fully — no manual override for production-bound merges.
- feature/* branches are deleted after merge.
- hotfix/* branches merge into both main and develop to avoid regressions.

## Commit convention

Use Conventional Commits (conventionalcommits.org) so history stays scannable across a project this size:

feat(students): add admission workflow state machine
fix(billing): correct proration on plan upgrade
chore(ci): add security scan step
docs(readme): update setup instructions