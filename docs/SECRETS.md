# Server-Side Secrets

These values must never appear in `.env`, `.env.example`, client bundles, or git history. They belong in:

- **Supabase → Project Settings → Edge Functions → Secrets** (for anything an Edge Function calls), or
- **Vercel → Project Settings → Environment Variables** (server-only, not exposed to the client bundle — do not prefix with `VITE_`).

| Secret                                           | Used by                                                                                           | Where it's set                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- | -------------------------------- |
| `SUPABASE_SERVICE_ROLE_KEY`                      | Edge Functions needing to bypass RLS (e.g. Super Admin cross-tenant operations, webhook handlers) | Supabase Edge Function secrets   |
| `PAYSTACK_SECRET_KEY`                            | Payment verification, webhook signature validation                                                | Supabase Edge Function secrets   |
| `HUBTEL_API_KEY` / `HUBTEL_API_SECRET`           | Secondary payment processor                                                                       | Supabase Edge Function secrets   |
| `SMS_PROVIDER_API_KEY`                           | Outbound SMS (see `docs/COMMUNICATION_PROVIDERS.md` for vendor decision)                          | Supabase Edge Function secrets   |
| `EMAIL_PROVIDER_API_KEY`                         | Transactional email (see `docs/COMMUNICATION_PROVIDERS.md`)                                       | Supabase Edge Function secrets   |
| `SENTRY_AUTH_TOKEN`                              | Source-map upload during CI build (not needed at runtime)                                         | GitHub Actions repository secret |
| `SUPABASE_ACCESS_TOKEN` / `SUPABASE_PROJECT_REF` | CI/CD migration deployment                                                                        | GitHub Actions repository secret |

## Rules

- No secret is ever committed to source control, including in comments or example values.
- Every secret has a distinct value per environment (development / staging / production) — never reuse a production key in staging.
- Rotate immediately if a secret is ever exposed (accidental commit, screenshot, log leak).
- `SUPABASE_SERVICE_ROLE_KEY` is the highest-risk credential in this system — it bypasses Row Level Security entirely. It must only be referenced inside Edge Functions, never sent to any client.
