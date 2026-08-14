<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Established project patterns

Read `docs/FRONTEND_GUIDE.md` before changing the interface, animation system, React Three Fiber scene, linting hooks, or browser-testing workflow. It records verified project-specific patterns and known pitfalls; reuse them instead of repeating exploratory research.

After editing `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, or `.cjs` files, always run `yarn lint`. Before completing application work, run `yarn lint`, `yarn format:check`, and `yarn build`.

The user owns the `yarn dev` process. Use the already-running server for browser testing and do not start, restart, or stop it unless explicitly requested.
