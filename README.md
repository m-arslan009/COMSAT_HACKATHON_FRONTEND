# COMSAT Hackathon Frontend

A Next.js App Router starter with TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, and Zod.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. The frontend health endpoint is `http://localhost:3000/api/health`.

## Organize by feature

```text
src/
  app/
    (home)/
      page.tsx
      _components/
    api/
      health/route.ts
    globals.css
    layout.tsx
  components/ui/
  lib/
    backend.ts
    utils.ts
```

Keep each feature's route, components, hooks, schemas, tests, and data access together in its own folder. Use private folders such as `_components` for route-specific code. Route groups such as `(home)` organize routes without changing their URLs. Put reusable shadcn/ui primitives in `src/components/ui` and shared utilities in `src/lib`.

Add shadcn/ui primitives with `npm exec -- shadcn add <component>`.

See [frontend rules](AGENTS.md) for design and implementation standards and the [application map](docs/application-map.md) for routes, dependencies, and change points.

## Connect the Next.js backend

When the backend is available, clone it alongside this project or into the ignored `.repos/backend` folder. Run it on port `3001` or another available port. Copy `.env.example` to `.env.local` and set `BACKEND_API_URL` to the backend origin. Restart the frontend dev server after changing the value.

Use `backendFetch()` from `src/lib/backend.ts` in server components or Next.js route handlers. Add the actual endpoint paths and response schemas in each feature's folder once the backend contract is agreed. For requests initiated by client components, add a same-origin route handler for the specific operation. The starter's `/api/health` reports the frontend process status.

## Git hooks and checks

- `pre-commit` scans staged files for credentials, runs ESLint and Prettier, and checks whitespace.
- `commit-msg` enforces Conventional Commits, for example `feat: add team registration`.
- `pre-push` verifies the lockfile, scans for credentials, checks formatting, lint, and types, runs the tests, audits development and runtime dependencies, and builds the app. Push from a clean checkout of the code being sent.

`npm ci` enables the hooks. Run `npm run verify` to run the full gate manually, `npm test` to run the core tests, and `npm run format` to format files. Dependency auditing uses the npm registry. The scoped `minimatch` override addresses [the advisory in shadcn's dependency chain](https://github.com/advisories/GHSA-g3hv-75wg-m249) and can be reviewed when shadcn updates that dependency.
