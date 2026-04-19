---
name: supabase-schema-introspection
description: >-
  Mandatory first step before editing any app Drizzle db/schema.ts, Drizzle
  migrations, or lib/admin/entities column definitions: read live Postgres from
  the connected Supabase project via MCP (list_tables verbose) or execute_sql —
  never guess columns, nullability, PK kind, or generated expressions. Use with
  Galaxy, Guard Allowance, Vibram Purchase, and Vibram Sales schemas.
user-invocable: true
---

# Supabase schema introspection (read the DB first)

## When this applies

Before changing:

- **`apps/*/db/schema.ts`** (any workspace app)
- **Drizzle migrations** or **`drizzle-kit`**-driven SQL that reflects table shape
- **`lib/admin/entities/*`** column definitions that must match physical columns

**Stop and introspect** if you were about to infer names, nullability, **`integer` identity vs `uuid`**, or **generated column** expressions from memory or from old chat context.

## What to do (minimal sequence)

1. **Supabase MCP** — ensure the right project is selected; use **`list_projects`** if needed.
2. **`list_tables`** with **`verbose: true`** and **`schemas`** covering every namespace you will touch for that app:

   | App | Typical `schemas` array |
   |-----|-------------------------|
   | **galaxy** | `["once_upon_a_galaxy", "public"]` |
   | **guard-allowance** | `["guard_allowance"]` (add **`"public"`** only if you use it) |
   | **vibram-purchase** | `["vibram_purchase"]` |
   | **vibram-sales** | `["vibram_sales"]` |

3. From the response, use per-table **`columns`** (types, nullable, identity, generated, defaults) and **`foreign_key_constraints`** / **`primary_keys`** as the source of truth.

4. If MCP is unavailable, use **`execute_sql`** against **`information_schema.columns`** (and **`pg_catalog`** when you need generation expressions or identity details), or the Supabase Dashboard Table Editor — still **before** editing repo files.

## After introspection

Map verified shapes into Drizzle and admin configs using the full checklist in **`.agents/skills/supabase-schema-sync/SKILL.md`** (table → **`db/schema.ts`** → **`lib/admin/entities/*`** → **`adminEntityTables`**, verification).

## Related

- **`.cursor/rules/supabase-schema-introspection.mdc`** — same rule, always-on reminder when the rule is attached.
- **`.agents/skills/drizzle/SKILL.md`** — Drizzle patterns for this repo.
- **`.agents/skills/galaxy-testing/SKILL.md`** — tests and API checks after schema changes.
