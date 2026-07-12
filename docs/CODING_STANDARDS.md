# Coding Standards

## Formatting

Prettier is the single source of truth for formatting — no manual style debates. Run `npm run format` before committing if you're not using an editor that formats on save. CI can later be extended to run `npm run format:check` as a gate, once the team is used to the workflow.

## Linting

`npm run lint` must pass with zero errors before any PR merges (warnings are acceptable but should be looked at, not ignored by default). The two rules worth understanding, since we hit both already:

- `react-refresh/only-export-components` — a file exporting a React component must only export components. Contexts, hooks, and constants go in their own files (see `src/hooks/useAuth.ts` and `src/contexts/auth-context.ts` for the pattern).
- TypeScript strict rules from `typescript-eslint` — avoid `any`; prefer explicit types on function parameters and return values for anything exported.

## File naming and organization

- Components: PascalCase file names matching the exported component (`LoginPage.tsx` exports `LoginPage`).
- Hooks: camelCase, prefixed `use` (`useAuth.ts`).
- Non-component context/state files: kebab-case (`auth-context.ts`) — this signals at a glance that the file has no JSX and won't trigger fast-refresh rules.
- One component per file, except tightly-coupled small helper components (like `LogoMark` inside `LandingPage.tsx`) that aren't reused anywhere else.
- Follow the existing folder structure from `docs/` (established in Phase 0 Task 3): `components/`, `features/`, `services/`, `hooks/`, `contexts/`, `utils/`, `constants/`, `routes/`, `layouts/`, `types/`.

## Testing

- Unit/component tests: `ComponentName.test.tsx`, next to the file they test.
- Integration tests (real Supabase calls, multi-component flows): `*.integration.test.tsx`, also next to what they test. These are excluded from the fast `test:coverage` run and only run under `test:integration`, since they're slower and need real backend access.
- Every new form or piece of validation logic should get at least: one test confirming it renders correctly, and one test per validation rule that matters (see `LoginPage.test.tsx` for the pattern).
- Don't write tests just to hit a coverage number — test behavior that would actually break something if it regressed.

## TypeScript

- Prefer `interface` for object shapes that might be extended (component props, context values); `type` for unions, intersections, and utility types.
- No `any` — if a type is genuinely unknown, use `unknown` and narrow it.
- Every exported function, hook, and component should have explicit types on its parameters — return types can usually be inferred and don't need to be spelled out everywhere.

## Environment variables

- Only `VITE_`-prefixed variables belong in `.env.local` / `.env.example` — anything else is a server-side secret and belongs in Supabase Edge Function secrets or Vercel project settings (see `docs/SECRETS.md`).
- Never commit a real value to `.env.example` — it's a template, not a config file.

## Commits and branches

See `docs/BRANCHING_STRATEGY.md` for the full branch model and commit message convention (Conventional Commits). Every commit should represent one logical change — if you're using "and" to describe what a commit does, it's often two commits.

## Forms

- Every form using `react-hook-form` + `zod` (the pattern used throughout auth pages) must have `noValidate` on the `<form>` element, so Zod's validation messages show instead of the browser's native ones — see `LoginPage.tsx` for the reference implementation.
- Every input needs a `<label htmlFor="...">` matched to the input's `id` — required for accessibility and for tests to query reliably via `getByLabelText`.
