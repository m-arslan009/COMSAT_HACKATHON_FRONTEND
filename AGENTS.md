<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Start with the application map

- Read [the application map](docs/application-map.md) before searching the repository. Follow its links to the affected routes, components, tests, and interfaces.
- Update the map in the same change when adding, changing, moving, or removing a feature, route, shared module, or data flow. Keep links, ownership, dependencies, and verification commands current.

## Frontend structure and code quality

- Colocate each feature's routes, components, hooks, schemas, data access, and tests. Keep route-specific modules in private folders such as `_components`. Put shared UI in `src/components/ui` and genuinely shared helpers in `src/lib`.
- Check for an existing component, hook, schema, or utility before adding one. Extend existing behavior when the contract fits. Extract shared logic when there is a real second use or a clear shared boundary.
- Preserve behavior that callers rely on. Use clear names, explicit data flow, and focused functions. Remove unused code, state, imports, and unnecessary abstraction. Use server components by default and introduce client components where interactivity or browser APIs require them.

## Responsive design

- Design mobile-first and put base styles on the smallest layout. Use Tailwind's shared breakpoint tokens consistently. The table uses a 16 px browser default.

  | Range starts at  | Tailwind prefix | Typical layout                |
  | ---------------- | --------------- | ----------------------------- |
  | Below 576 px     | Base            | Narrow mobile, single column  |
  | 576 px (36 rem)  | `sm:`           | Wide mobile or compact layout |
  | 768 px (48 rem)  | `md:`           | Tablet or split layout        |
  | 1024 px (64 rem) | `lg:`           | Desktop                       |
  | 1280 px (80 rem) | `xl:`           | Wide desktop                  |
  | 1536 px (96 rem) | `2xl:`          | Extra-wide desktop            |

- Change layout where the content needs room. Use flexible Grid or Flexbox tracks, sensible content widths, and fluid spacing. Allow labels, validation messages, and translated text to wrap. Let images resize within their containers and keep their aspect ratio.
- Keep horizontal scrolling inside components that need it, such as wide tables. Check narrow layouts at 320 px, either side of every changed breakpoint, and on a wide viewport. Verify zoom and text reflow, keyboard access, and usable touch targets. Aim for 44 × 44 px for primary touch controls.

## Typography, color, and layout

- Start with existing typography, spacing, and theme tokens. Use a consistent type scale in `rem`, a clear heading hierarchy, and readable body line height around 1.5. Aim for roughly 45–75 characters per line in long-form copy.
- Use semantic color tokens such as `background`, `foreground`, `primary`, `muted-foreground`, and `destructive`. Reserve accents for actionable elements and use consistent colors for status. Pair status colors with text or an icon that has an accessible label.
- Meet WCAG AA contrast in every supported theme. Use at least 4.5:1 for normal text, 3:1 for large text, and 3:1 where visual boundaries or indicators are needed to identify controls and states. Keep keyboard focus visible and honor reduced-motion preferences.
- Use alignment, proximity, and spacing to make related items easy to scan. Keep interactive patterns consistent and design loading, empty, error, disabled, and success states when a feature needs them.

## Tests and security verification

- Add the smallest set of behavioral tests that verifies a new core feature or function. Cover its main success path and meaningful failure, boundary, or permission cases. Test at the nearest useful level and reuse existing fixtures or helpers.
- For small updates, run the relevant existing tests. Add a regression case only when existing coverage would miss a meaningful failure. Use `npm test` for the existing suite and verify layout changes at the relevant viewport widths.
- After implementing a feature, deliberately exercise ways it can fail in a local or authorized test environment. Use synthetic data and check relevant cases such as missing or malformed input, special characters, oversized payloads, duplicate submissions, expired sessions, unauthorized requests, and cross-user access. Verify rejected operations preserve state and avoid exposing sensitive data.
- Treat browser input, URL parameters, and upstream responses as untrusted. Validate data at server and API boundaries. Keep authorization with the backend and test that restrictions hold through any frontend route handler. Render text safely, keep secrets server-only, use explicit outbound destinations, and keep sensitive values out of logs and client errors.

## Commit and push

- Run `npm ci` to install the tracked dependencies and activate Husky. Use Conventional Commits and let pre-commit scan staged files, lint and format them, and check whitespace.
- Run `npm run verify` for the same checks used by pre-push. Push from a clean checkout of the changes being sent. Fix failing checks, including dependency advisories and flagged credentials, before pushing. Keep the lockfile committed and review scoped overrides when updating dependencies.
