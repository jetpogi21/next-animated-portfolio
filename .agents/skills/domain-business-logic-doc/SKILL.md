---
name: domain-business-logic-doc
description: >-
  For domain-heavy apps (e.g. Vibram purchase / Philippine VAT), maintain a single BUSINESS-LOGIC.md
  for field meaning and rules instead of relying on code comments or docSqlType alone. Use when
  adding entities, changing workflows, or explaining tax/compliance semantics.
user-invocable: true
---

# Domain business logic documentation

## When this applies

Use when this portfolio (or a future app here) grows **domain-heavy** behavior — tax, compliance, pricing rules — where **`docs/BUSINESS-LOGIC.md`** at the repo root (or next to a feature) is clearer than code comments alone.

**This starter** has no bundled **`BUSINESS-LOGIC.md`**. Create **`docs/BUSINESS-LOGIC.md`** when you introduce non-obvious business rules.

The **`apps/vibram-purchase/docs/BUSINESS-LOGIC.md`** / **`npm run scaffold:app`** examples below are **historical references** from another monorepo; adapt paths to **`docs/`** or **`src/`** as appropriate.

## Rules for agents

1. **Single canonical doc** per app (or per bounded subdomain agreed with the maintainer). Prefer **`docs/BUSINESS-LOGIC.md`** next to that app’s `package.json`.
2. **When you add or change** an entity, column behavior, validation rule, or cross-table workflow: **update `BUSINESS-LOGIC.md` in the same delivery** with:
   - What the entity or field **means in the business** (not only SQL type).
   - **Philippines / VAT / BIR context** when relevant (input vs output VAT, TIN, invoice requirements, reporting periods, etc.).
   - **Immutability**, **defaults**, **derived values**, and **who cares** (finance, ops, audit).
3. **Do not** offload long explanations to:
   - `docSqlType` on `AdminEntityColumn` (keep that a **short** SQL hint only),
   - giant block comments in `lib/admin/entities/*.ts`,
   - or Drizzle schema comments **unless** it is a one-line technical note.
4. **Do** add a **short pointer** in code when useful — e.g. in `db/schema.ts` above a table: `/** See docs/BUSINESS-LOGIC.md — Suppliers. */` (one line).
5. **Structure:** Use `##` per **entity** or **workflow**; use bullet lists for fields; add a **Product scope** section when the app is built incrementally (what exists now vs planned).
6. **Supabase / schema:** Before changing Drizzle or admin entities for `vibram_purchase`, confirm columns with Supabase MCP or Dashboard (see `.cursor/rules/supabase-schema-introspection.mdc`).

## Related

- **Monorepo layout / new apps:** `.agents/skills/galaxy-monorepo/SKILL.md` (scaffold includes stub **`docs/BUSINESS-LOGIC.md`**)
- **Admin entities:** `.agents/skills/codegen-pattern/SKILL.md`, `lib/admin/entities/*.ts`
- **Vibram Sales — legacy Access file path + ODBC → JSON CLI:** `.agents/skills/access-odbc-query-json/SKILL.md` (see also **`apps/vibram-sales/docs/BUSINESS-LOGIC.md`** — *Legacy Access*)
- **Schema sync:** `.agents/skills/supabase-schema-sync/SKILL.md`
