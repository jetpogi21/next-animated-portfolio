---
name: drizzle
description: Drizzle ORM reference for Postgres/Supabase Next.js apps. This portfolio starter has no Drizzle — use when adding db/schema.ts, drizzle-kit, DATABASE_URL, or typed SQL.
user-invocable: false
allowed-tools: Bash(npm run db:*), Bash(npx drizzle-kit *)
---

# Drizzle ORM (reference)

> **This portfolio starter** has **no** Drizzle **`db/`** tree or **`npm run db:*`** scripts. The tables below describe a **multi-app monorepo elsewhere** — use as patterns **only if** you add Drizzle to **this** repo (typically **one** `db/schema.ts` at the root or under **`src/server/db/`**).

## Project layout (multi-app pattern — not this repo)

**Each Next.js app under `apps/*` has its own Drizzle root** (run **`npm run db:* -w <workspace>`** from repo root):

| Path (per app) | Role |
|----------------|------|
| **`apps/galaxy/db/schema.ts`** | Galaxy tables — e.g. **`once_upon_a_galaxy`** `pgSchema`, `profiles`, etc. |
| **`apps/guard-allowance/db/schema.ts`** | Guard Allowance — **`guard_allowance`** `pgSchema` (e.g. **`guards`**, **`deductions`**). Introspect live Supabase before changing shapes (see **`supabase-schema-sync`** skill). |
| **`db/index.ts`** (under that app) | Server-only `db` export (postgres.js + singleton; global name differs per app to avoid pool collision) |
| **`drizzle.config.ts`** (under that app) | drizzle-kit config (`dialect: postgresql`, `schema: ./db/schema.ts`) |
| **`drizzle/`** (under that app) | Generated SQL migrations when used |

Legacy shorthand “`db/schema.ts`” in examples means **the active app’s** `db/schema.ts`.

Import the client only on the server:

```ts
import { db } from "@/db"
```

`db/index.ts` uses `import "server-only"` so accidental client imports fail at build time.

## npm scripts

- `npm run db:generate` — diff schema → SQL in `drizzle/`
- `npm run db:migrate` — apply migrations (needs `DATABASE_URL`)
- `npm run db:push` — push schema to DB (prototyping; no migration files)
- `npm run db:studio` — local Drizzle Studio

Use the same package runner the repo uses (`npm` here).

## Environment

- **`DATABASE_URL`** — Postgres URI from Supabase (**Project Settings → Database**). Documented in each app’s **`.env.example`** (e.g. **`apps/galaxy`**, **`apps/guard-allowance`**). Local overrides: **`.env.local`** per app (gitignored).
- drizzle-kit runs with cwd = app directory via **`-w <workspace>`**. It does **not** use Next’s env loader unless configured: **`apps/guard-allowance/drizzle.config.ts`** loads **`.env`** then **`.env.local`** (override) via **`dotenv`** so **`npm run db:migrate -w guard-allowance`** sees **`DATABASE_URL`** without exporting it in the shell.

Never expose `DATABASE_URL` or service-role keys to the browser or client bundles.

## Schema conventions

- Use `drizzle-orm/pg-core`: `pgTable`, column builders, `uuid`, `text`, `timestamp`, etc.
- Export all tables from `db/schema.ts` (or split into `db/schema/*.ts` and re-export) so `db/index.ts` can pass `{ schema }` to `drizzle()`.
- Prefer explicit `notNull()`, defaults, and `withTimezone: true` for timestamps when matching Supabase defaults.

## Queries

- Use `db.select()`, `db.insert()`, `db.update()`, `db.delete()` with Drizzle’s query builder.
- Prefer `eq`, `and`, `or` from `drizzle-orm` for conditions.
- For request-scoped deduplication in RSC, wrap loaders with `React.cache()` (see project React/Next skills).

## Migrations vs push

- **Teams / production:** `db:generate` then commit `drizzle/`, then `db:migrate` in deploy pipelines.
- **Local experiments:** `db:push` is faster; align with migrations before shipping.
- **Hand-written SQL:** Some guard-allowance files under **`apps/guard-allowance/drizzle/`** are authored directly (e.g. triggers that enforce cross-table rules). The folder includes **`meta/_journal.json`** so **`npm run db:migrate -w guard-allowance`** runs **`0001_*.sql`** then **`0002_*.sql`** in order (needs **`DATABASE_URL`**).

### Production / existing data — avoid journal vs reality mismatch

**Treat `drizzle.__drizzle_migrations` as the source of what drizzle-kit will try to apply.** If the database already has tables, constraints, or triggers from **`db:push`**, manual SQL, or an older process, but those steps were **never** recorded in **`drizzle.__drizzle_migrations`**, then **`npm run db:migrate`** may fail on the first matching file with errors like **relation already exists** (`42P07`). That does **not** mean Drizzle “dropped” data — it means the migration history and the live schema disagree. Fix the **history** or apply **only the missing SQL**, do not re-run `CREATE TABLE` against an existing table.

**Practices:**

1. **Shared environments (staging/prod):** Prefer **migrate-only** (`db:generate` + `db:migrate`). Avoid **`db:push`** there; it bypasses migration files and causes exactly this mismatch later.
2. **Before applying constraint/trigger migrations on real data:** Run any repo-provided **read-only** checks first. Example: **`apps/guard-allowance/drizzle/check_payroll_overtimes_period_consistency.sql`** before **`0002_payroll_overtimes_same_period.sql`**; fix bad rows before the trigger exists.
3. **If migrate fails because an early migration’s objects already exist:** Do **not** drop tables to “fix” it. Pick one path:
   - **Baseline:** Mark the already-applied migration(s) in **`drizzle.__drizzle_migrations`**. Drizzle’s migrator compares each journal entry’s **`when`** to the **latest** row’s **`created_at`** (see **`drizzle-orm/pg-core/dialect.js`** `migrate`); it does **not** check hashes before running SQL. Each **`hash`** must still be the **SHA-256 of the entire `.sql` file** (same as **`readMigrationFiles`** in **`drizzle-orm/migrator.js`**). If **`__drizzle_migrations`** already has rows with large **`created_at`** (e.g. legacy timestamps) but journal **`when`** values are **newer**, **`db:migrate` will try to re-run early migrations** (often failing on `CREATE TABLE`). **`apps/vibram-sales`** keeps early journal **`when`** values small (**`0`**, **`1`**, …) so existing DBs skip **`0000`/`0001`** while empty DBs still run them (**`!lastDbMigration`**). **Vibram Sales:** **`npm run db:baseline:0000 -w vibram-sales`** (hash-only row for **`0000`**), **`npm run db:apply:sales-taxes-0001 -w vibram-sales`** (runs **`0001`** SQL + hash), **`npm run db:inspect:migrations -w vibram-sales`** (debug). **Guard Allowance `payroll_overtimes`:** if the table exists from **`db:push`** but **`0001`** was never journaled, run **`apps/guard-allowance/scripts/baseline-payroll-overtimes-0001.mjs`** (or **`npm run db:baseline:payroll-overtimes-0001 -w guard-allowance`**), then **`npm run db:migrate -w guard-allowance`** so **`0002`** (and later) apply.
   - **SQL editor:** Run **only** the **new** migration body (e.g. contents of **`0002_*.sql`**) in Supabase, then align **`drizzle.__drizzle_migrations`** so future **`db:migrate`** does not duplicate work. Details and guard-allowance-specific notes: top comment in **`0002_payroll_overtimes_same_period.sql`**.

**Config:** **`apps/guard-allowance/drizzle.config.ts`** loads **`.env`** then **`.env.local`** so **`DATABASE_URL`** is available to drizzle-kit without shell exports.

You can always run migration SQL in the Supabase SQL editor instead of CI **`db:migrate`**, as long as the journal table stays consistent with what was applied.

## Supabase-specific

Read [supabase.md](./supabase.md) for connection strings, pooler + `prepare: false`, RLS, and when to use Supabase client vs Drizzle.

## Deep references

Official docs: [Drizzle ORM](https://orm.drizzle.team/docs/overview), [drizzle-kit](https://orm.drizzle.team/docs/kit-overview).

For Postgres performance and query design, use the **supabase-postgres-best-practices** skill when optimizing SQL or schema.
