---
name: supabase-schema-sync
description: >-
  Enumerates Postgres tables/columns from the connected Supabase project before
  editing Drizzle `db/schema.ts`, admin entity configs, or migrations. Covers
  Supabase MCP (`list_tables` verbose, `execute_sql` information_schema), Dashboard
  Table Editor, and keeping Galaxy (`once_upon_a_galaxy`) and Guard Allowance
  (`guard_allowance`) tables aligned with this repo. Use when adding entities,
  fixing column mismatch errors (e.g. 42703), keywords, tags, rarities, guards,
  deductions, guard-allowance payroll-period children (**`security_services`**,
  **`cash_counts`**, **`cash_reimbursements`**, **`payrolls`** / **`payroll_deductions`** /
  **`payroll_overtimes`**, etc.), or when the user says the
  table already exists in Supabase.
user-invocable: false
---

# Supabase schema sync (reference)

> **This portfolio starter** has no Supabase/Drizzle wiring in **`package.json`**. Treat the rest of this file as **patterns for other repos** unless you add a database here.

## Why

Drizzle models and admin `columns` must match **live** Postgres. Guessing names
( e.g. `keyword` vs `name`, `uuid` vs `serial` ) causes runtime `42703` errors
and passing Vitest mocks will not catch DB shape.

## Agent requirement (do this first)

Before changing **`apps/galaxy/db/schema.ts`**, **`apps/guard-allowance/db/schema.ts`**,
or any **`lib/admin/entities/*`** column list for those apps, **pull the live shape**
from the connected Supabase project — **do not invent columns, types, or identity
modes from memory**.

1. **`list_projects`** (Supabase MCP) → use the **project id** for this app’s database
   (same project both apps often share).
2. **`list_tables`** with **`verbose`: `true`** and **`schemas`** that include every
   namespace you touch, for example:
   - Galaxy: **`["once_upon_a_galaxy", "public"]`**
   - Guard Allowance: **`["guard_allowance"]`** (add **`public`** only if you use it)
3. Map **`columns`** (types, nullable, identity, generated) and **`foreign_key_constraints`**
   into Drizzle + admin entity definitions.

If MCP is unavailable, use **`execute_sql`** against `information_schema` / `pg_catalog`
for the same table, or the Dashboard Table Editor — still **before** editing code.

## Enumerate columns (pick one)

### 1. Supabase MCP (preferred when connected)

- **`list_projects`** → copy the **`id`** for the app’s project (not an unrelated org project).
- **`list_tables`** with:
  - `project_id`: that id
  - `schemas`: Galaxy — `["once_upon_a_galaxy", "public"]`. Guard Allowance — `["guard_allowance"]` (include any other schema you use).
  - `verbose`: **`true`**
- Read **`columns`** per table: `name`, `data_type` / `format`, `options`
  (nullable, updatable, identity, generated), `default_value`, **`primary_keys`**,
  **`foreign_key_constraints`**.

### 2. `execute_sql` (ad hoc)

```sql
select column_name, data_type, udt_name, is_nullable, column_default
from information_schema.columns
where table_schema = 'once_upon_a_galaxy' and table_name = 'keywords'
order by ordinal_position;
```

Check **`is_generated` / `generation_expression`** in Postgres 15+ if needed:

```sql
select a.attname, pg_get_expr(d.adbin, d.adrelid) as generation_expr
from pg_attribute a
join pg_attrdef d on d.adrelid = a.attrelid and d.adnum = a.attnum
where a.attrelid = 'once_upon_a_galaxy.keywords'::regclass
  and a.attgenerated <> '';
```

### 3. Supabase Dashboard

**Table Editor** → schema **`once_upon_a_galaxy`** → table → column list and types.

## Map into this repo

1. **`db/schema.ts`**
   - Galaxy: `pgSchema("once_upon_a_galaxy")` tables.
   - Guard Allowance: `pgSchema("guard_allowance")` tables under **`apps/guard-allowance/db/schema.ts`**.
   - Match **SQL names** (`snake_case` in `text("name")`, etc.).
   - Use **`integer("id").primaryKey().generatedAlwaysAsIdentity()`** when Postgres
     reports identity **`ALWAYS`** (`attidentity` **`a`**); use
     **`generatedByDefaultAsIdentity()`** when the DB uses **`BY DEFAULT`** (`d`).
     Use **`uuid`** + `defaultRandom()` only when the PK is UUID in the DB.
   - **`citext`**: reuse the existing `citext` `customType` in this file.
   - **Generated columns** (e.g. `slug`): `generatedAlwaysAs(sql\`…\`)` with the
     same expression as Supabase (e.g. `slugify(name)`).
   - **`jsonb`**: `jsonb("notes").$type<unknown>()` (or a stricter type).
   - **Guard Allowance — `payroll_period_id` children:** Tables such as **`security_services`**, **`cash_counts`**, **`cash_reimbursements`**, and **`agency_breakdowns`** reference **`payroll_periods`**. **`payrolls`** also references **`payroll_periods`**; **`payroll_overtimes`** references **`payrolls`** twice (`payroll_id` and **`absent_guard_id`** → `payrolls.payroll_id`). Repo migration **`drizzle/0002_payroll_overtimes_same_period.sql`** adds a **BEFORE INSERT/UPDATE** trigger so both FKs always resolve to payroll rows in the **same** period (CHECK cannot reference other tables). Introspect each before editing Drizzle or admin related-row configs so PK/FK names, **`numeric`** vs **`citext`**, nullability, and timestamps match live Postgres.

2. **`lib/admin/entities/<entity>.ts`**
   - **`key`**: Drizzle **property** name (usually camelCase: `isActive`, `createdAt`).
   - **`sqlName`**: physical column for docs (`is_active`, `created_at`).
   - **`idColumn.valueType`**: `"uuid"` vs `"integer"` must match the PK.
   - Do not mark **`create`/`patch`** on DB-generated columns (`slug`, identity `id`).
   - Use **`optionalOnCreate`** / **`patchEmptyClears`** (see `admin-entity-types.ts`)
     for nullable text fields.
   - **Admin list table (`list` flag):** set **`list: false`** by default for
     **`slug`**, **`createdAt`**, **`updatedAt`**, and **`softDeletedAt`** (and any
     column mapped from `soft_deleted_at`). The data grid reads `columns` where
     `list` is true; those fields stay in the column list for API validation and
     docs. Use **`list: true`** only when the product explicitly wants them visible.

3. **`lib/admin/admin-entity-tables.ts`**
   - Add the table to **`adminEntityTables`** keyed by the admin slug (shared by list + CRUD).

4. **Verify**
   - `npx tsc --noEmit`
   - Hit **`GET /api/admin/<slug>`** signed in or run Playwright with `E2E_ADMIN_*`.

## Playwright vs server logs

E2E asserts **HTTP status** and JSON body (e.g. 500 + `{ "error": "…" }`). It does
not read **`next dev` stderr**. For Postgres details, use server logs or MCP/SQL
above — not the browser alone.

## Related

- Project Drizzle skill: `.agents/skills/drizzle/SKILL.md`
- Testing: `.agents/skills/galaxy-testing/SKILL.md`
