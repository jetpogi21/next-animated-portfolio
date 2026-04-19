# Drizzle + Supabase Postgres

## Connection string

- Dashboard: **Project Settings → Database → Connection string** (URI).
- **Transaction pooler** (port `6543`) fits serverless / short-lived Node (e.g. Vercel). **Session mode** (port `5432`) is often used for long-lived tools (e.g. local Studio, some migration runners).
- Append `?sslmode=require` if your client or host requires it.

## Driver settings (this repo)

`db/index.ts` uses `postgres` (postgres.js) with:

- `max: 1` — limits connections per serverless instance.
- `prepare: false` — required for **PgBouncer / transaction pooler** compatibility on Supabase.

If you switch to direct session Postgres only, you may enable prepared statements; keep pooler settings when using port `6543`.

## Auth and data access

- **Supabase Auth** stays on `@supabase/ssr` / `supabase-js` (cookies, `getUser()`, etc.).
- **Drizzle** talks to Postgres with `DATABASE_URL`. That connection is **not** the same as PostgREST + anon key: RLS behavior depends on **which DB role** the URL uses.

Implications:

- A **service-role** or superuser URL **bypasses RLS**. Only use it on trusted servers. Still validate the user (e.g. `createClient()` + `getUser()`) before mutating rows.
- To enforce RLS with Drizzle you must use a **per-request JWT** / `SET LOCAL` role patterns or a dedicated DB user with limited grants — advanced; default pattern here is **trusted server + explicit auth checks**.

Prefer **Supabase client** from the browser for anon-key + RLS-protected reads/writes when you want RLS without server-side bypass.

## `auth` schema

Supabase owns `auth.users` and related objects. Do **not** put Supabase-managed auth tables in Drizzle migrations unless you intentionally mirror them. App tables in `public` (or other app schemas) are the usual Drizzle targets.

## Foreign keys to `auth.users`

Common pattern for a `profiles` row keyed by user id:

- `id` uuid PK referencing `auth.users(id)` — add the FK in SQL (migration) or Supabase SQL editor if Drizzle does not model `auth` schema tables.

## Starter `profiles` table

`db/schema.ts` includes an example `profiles` table. Before `db:push`:

- Remove it if you already created `profiles` via Supabase SQL snippets.
- After creating any table, enable **RLS** and policies in Supabase if clients or roles can access it outside your locked-down server path.
