# Quiosk — authentication and database foundation

This branch is a scaffold, not a deployed/verified database integration.

## Stack
- Better Auth: email/password sessions.
- Neon PostgreSQL: server-side data store.
- Prisma 7: migrations and database queries.
- Roles: `client` by default, `editor`, `admin`.

## Setup
1. Create a Neon project, ideally separate development and production branches.
2. Copy `app/.env.example` to the repository root as `.env.local`, using the pooled Neon URL for `DATABASE_URL` and direct URL for `DIRECT_URL`. Keep values in the hosting provider's secret store; never in Git.
3. Run `npm install` to install package dependencies **and regenerate package-lock.json**. Commit the resulting lockfile before using `npm ci` in CI.
4. Run `npx prisma generate` and `npx prisma migrate dev --name auth_and_publications` against a development Neon database. Review migration SQL.
5. Configure `BETTER_AUTH_SECRET` to a random value of at least 32 characters; set `BETTER_AUTH_URL` to the deployed origin and add trusted origins if needed.
6. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` after installing and generating Prisma.
7. Create the first admin **using an audited, one-time server-side process**. Do not expose a public role promotion endpoint or allow users to choose their role at signup.

## Roles and authorization
All new accounts are `client`. The `role` is a server-owned Better Auth user field with `input: false`.
Protected pages must use `requireSession`/`requireRole`. Every editor/admin mutation must independently authorize the current server session.
Client subscription data will be added with orders and entitlements; do not infer paid access from the client cart.

## Known limitations
- No Neon credentials have been supplied; connection and migrations have not run.
- Dependencies have been added to package.json but package-lock.json must be regenerated with npm install.
- Email verification, password reset and email delivery are not yet configured.
- Publication management models are draft groundwork; upload/storage, copyright approvals, publishing workflows, and editorial audit logs come later.
- Do not merge into the production branch until build, migration and authorization tests pass.
