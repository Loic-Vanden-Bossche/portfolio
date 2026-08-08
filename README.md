# Developer & photographer portfolio

A monorepository for a personal portfolio combining web development projects and photography. The application is a Next.js App Router project backed by PostgreSQL through Prisma. Infrastructure-as-code will live in `infrastructure/` later.

## Repository structure

```text
.
├── app/             # Next.js application, Prisma schema, and Dockerfile
├── infrastructure/  # Reserved for Terraform
├── compose.yaml     # Local application and PostgreSQL services
└── AGENTS.md        # Guidance for coding agents and contributors
```

## Requirements

- Docker with Docker Compose
- Or Node.js 24+, Yarn 1.22, and a local PostgreSQL 17+ instance

## Quick start with Docker

From the repository root:

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000). On first startup, the application container waits for PostgreSQL, applies the checked-in Prisma migration, and starts Next.js. The page footer reports whether the database connection is healthy.

PostgreSQL is exposed on the conventional host port `5432`.

The JSON health endpoint is available at [http://localhost:3000/api/health](http://localhost:3000/api/health).

Stop the services with `docker compose down`. To also remove local database data, use `docker compose down --volumes`.

## Run without Docker

Start PostgreSQL, then:

```bash
cd app
cp .env.example .env
yarn install
yarn db:deploy
yarn dev
```

Adjust `DATABASE_URL` in `app/.env` if your local credentials differ.

## Useful commands

Run these from `app/`:

- `yarn dev` — start the development server
- `yarn build` — create a production build
- `yarn lint` — run ESLint
- `yarn db:generate` — regenerate Prisma Client
- `yarn db:migrate --name <name>` — create and apply a development migration
- `yarn db:deploy` — apply existing migrations
- `yarn db:studio` — inspect data with Prisma Studio

## Database

The initial migration creates a `PortfolioProfile` record. The home page reads its introduction on the server, which provides a small end-to-end example of Next.js communicating with PostgreSQL through Prisma.

Never commit real credentials or `.env` files. The credentials in `compose.yaml` and `.env.example` are development-only defaults.
