# Component Standards

## Every data-driven component must handle four states

Any component that fetches or depends on async data (Supabase queries, auth state) should account for:

1. **Loading** — show a visible loading indicator, never a blank screen. `ProtectedRoute.tsx` already does this (`Loading…` text) — that's the reference pattern until we build a shared spinner component in Phase 1.
2. **Error** — show a message the user can act on, not a raw error object or a blank screen. Forms use `react-hot-toast` for this today (see `LoginPage.tsx`); page-level failures (a whole page failing to load) should use the `ErrorBoundary` component (Step 2 of this task) instead.
3. **Empty** — when data loads successfully but there's nothing to show (no students yet, no fee records yet), show a message explaining why and, where relevant, a next action — never just an empty table with no explanation.
4. **Success** — the normal case.

This is a checklist for Phase 1 feature work, not something every Phase 0 shell component needs — `SchoolDashboardPage.tsx` and `SuperAdminDashboardPage.tsx` are intentionally just placeholders right now.

## Accessibility baseline

- Every `<input>` has a `<label htmlFor>` matched to its `id` (see the `noValidate` fix in Task 4 — same principle).
- Every interactive element (`button`, `a`) has visible focus states — Tailwind's default focus rings are enabled by default; don't remove them with `outline-none` unless a custom focus style replaces it.
- Icons used without visible text (like inside `GoogleAuthButton`) need either `aria-hidden="true"` on the icon (already done) plus visible text next to it (already done), or an `aria-label` on the button if there's no visible text at all.
- Color is never the only signal for state — the `danger` red on validation errors is always paired with actual message text, never a red border alone.

## Props conventions

- Optional props get sensible defaults (`size = 'md'` pattern used in `BrandLogo` and `SchoolBrandLogo`).
- Boolean props default to the safer/less intrusive state (e.g., a hypothetical `disabled` prop should default to `false`, not `true`).
- Props that mirror a database column should use the same name as the column where practical (`schoolName`, `logoUrl` mirror `school_name`, `portal_logo_url` in intent even where casing differs for JS convention).

## When to extract a shared component vs. keep it local

Extract into `src/components/` only once a pattern repeats in a second place — `BrandLogo` and `SchoolBrandLogo` qualified because they're used across multiple pages/layouts. A one-off layout detail inside a single page (like `LogoMark` inside `LandingPage.tsx`) can stay local until it's actually needed elsewhere — don't pre-extract speculatively.
