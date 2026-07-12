# Domain Setup Checklist

No domain is registered yet. The original spec (11_Deployment_And_Operations.docx) hardcoded edutrack-gh.com, which conflicts with the Branding Standard's ban on "edutrack-gh" as a name — so a new domain choice is needed regardless.

## Suggested subdomain structure (once a root domain is chosen)

| Subdomain    | Purpose                                                                |
| ------------ | ---------------------------------------------------------------------- |
| www.<domain> | Marketing site                                                         |
| app.<domain> | School Portal + Super Admin Portal (React app)                         |
| api.<domain> | (optional) custom domain for Supabase Edge Functions, if desired later |

Note: the original spec split app. and admin. into separate subdomains for the two portals. Since routing is already isolated at /school/* vs /super-admin/* inside one React app (per 02_System_Architecture.docx), a single app.<domain> covering both is simpler to operate and still fully respects the route-guard isolation rules — recommending this unless there's a reason to keep them physically separate.

## Before Phase 0 sign-off

- [ ] Register a root domain (suggest checking availability of something built around "SharpbeeGh" or "EduTrack" once the final name is locked — e.g. a .com and a Ghanaian .com.gh if available)
- [ ] Point domain DNS at Vercel (for www / app)
- [ ] Verify sending domain with the chosen email provider (see docs/COMMUNICATION_PROVIDERS.md) — needed for authenticated email delivery (SPF/DKIM)
- [ ] Enforce HTTPS / SSL (handled automatically by Vercel once DNS is pointed correctly)
