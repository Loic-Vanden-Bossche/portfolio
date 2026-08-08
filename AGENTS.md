# AGENTS.md

## Project overview

This repository contains a web developer and photographer portfolio. Keep the two intended concerns separate:

- `app/`: Next.js application and its database layer.
- `infrastructure/`: Terraform infrastructure, currently reserved and out of scope.

## Application conventions

- Use TypeScript and the Next.js App Router.
- Prefer React Server Components. Add `"use client"` only when browser state or browser APIs are required.
- Keep reusable application code under `app/src/` and use the `@/` import alias.
- Access PostgreSQL through the singleton Prisma client in `app/src/lib/prisma.ts`.
- Never instantiate Prisma Client directly in route or page modules.
- Treat Prisma migrations as source code: create a new migration for schema changes and commit it.
- Keep secrets in environment variables. Update `.env.example` when adding required configuration.
- Build accessible, responsive interfaces and preserve the portfolio's editorial visual direction.

## Validation

Before considering an application change complete, run from `app/`:

```bash
yarn lint
yarn build
```

For database changes, also generate Prisma Client and test the migration against PostgreSQL:

```bash
yarn db:generate
yarn db:migrate --name <descriptive-name>
```

## Docker

`compose.yaml` is the canonical local full-stack environment. Keep its PostgreSQL version, environment variables, health check, and application database URL aligned with the Prisma configuration.

Do not add Terraform resources until infrastructure work is explicitly requested.
