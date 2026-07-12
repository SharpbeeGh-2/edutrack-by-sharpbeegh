# Communication Provider Decision

The original spec (`05_Super_Admin_Portal.docx`, Section 20) named Twilio (SMS) and SendGrid (email) as default integrations. Per your instruction to use best judgment on open conflicts:

## SMS — recommended: mNotify (with Hubtel SMS as fallback)

- Twilio's per-SMS cost and delivery reliability to Ghanaian networks (MTN, Telecel, AirtelTigo) is worse than Ghana-based aggregators.
- **mNotify** is purpose-built for the Ghanaian market, has a simple REST API, and is priced in GHS.
- **Hubtel SMS** is a solid fallback since Hubtel is already integrated for payments — one less vendor relationship to manage.
- `sms_provider_configurations` (already defined in the database spec) supports swapping providers without a schema change, so this choice isn't a lock-in.

## Email — recommended: Resend (fallback: SendGrid)

- Resend has a simpler API, better developer experience with React email templates, and a generous free tier for early-stage volume.
- SendGrid remains a fine fallback if deliverability issues arise at scale — the `email_provider_configurations` table supports switching without code changes.

## Action needed

No account exists yet for either recommended provider. Before Phase 0 sign-off, someone needs to:

1. Create an mNotify account and obtain an API key (or confirm Hubtel SMS as the sole provider to start).
2. Create a Resend account and verify a sending domain (blocked until a domain is registered — see `docs/DOMAIN_SETUP_CHECKLIST.md`).
