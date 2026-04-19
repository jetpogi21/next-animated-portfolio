---
name: access-odbc-query-json
description: >-
  Run dynamic Microsoft Access SQL via Python ODBC (pyodbc + ACE), defaulting to Vibram Sales
  `Sales Program.accdb`; write query results to JSON for migration into Postgres/Supabase. Use when
  extracting legacy Access data, counting rows, or prototyping Supabase imports on Windows.
user-invocable: true
---

# Access ODBC → JSON (Python)

## When to use

- You need to **read or query** a **`.accdb` / `.mdb`** file **without opening Access**.
- You are **migrating tables or snapshots** into **`vibram_sales`** (or elsewhere) and want **machine-readable JSON** (then load via script, `COPY`, or Supabase client).
- You want a **repeatable CLI** with **dynamic SQL** (`--sql` or `--sql-file`).

## Prerequisites (Windows)

1. **Python** with **`pip install -r tools/access-migration/requirements.txt`** (`pyodbc`).
2. **Microsoft Access Database Engine (ACE)** — ODBC driver **`Microsoft Access Driver (*.mdb, *.accdb)`**.
3. **Same bitness** for Python and ACE (e.g. 64-bit Python ↔ 64-bit ACE).

## Default database (Vibram Sales)

The canonical path for the **Sales Program** front-office file lives in code and docs:

- **Python:** `tools/access-migration/vibram_sales_access_paths.py` → **`SALES_PROGRAM_ACCDB`**
- **Product context:** `apps/vibram-sales/docs/BUSINESS-LOGIC.md` → section **Legacy Access (`Sales Program.accdb`)**

Override anytime with **`--db "C:\path\to\file.accdb"`**.

## CLI: `tools/access-migration/access_query_to_json.py`

| Flag | Meaning |
|------|--------|
| **`--sql "..."`** | SQL to execute (Access dialect). One of **`--sql`** or **`--sql-file`** is required. |
| **`--sql-file path`** | UTF-8 file containing the SQL. |
| **`--db path`** | Database file (default: Vibram **`SALES_PROGRAM_ACCDB`**). |
| **`--out path`** | Write JSON to this file. Omit or **`--out -`** → **stdout**. |
| **`--compact`** | Minified JSON (default: indented). |

**Output shape** (UTF-8 JSON):

```json
{
  "db": "C:\\\\...\\\\Sales Program.accdb",
  "columns": ["col1", "col2"],
  "rowCount": 2,
  "rows": [{ "col1": "...", "col2": "..." }]
}
```

- **Dates/times:** ISO strings.
- **Decimals:** strings (preserve precision).
- **Binary:** `{"_type": "bytes", "base64": "..."}`.

On success with **`--out`**, a one-line summary is printed to **stderr** (`Wrote N row(s) to ...`).

## Examples

From repo root:

```powershell
pip install -r tools/access-migration/requirements.txt
python tools/access-migration/access_query_to_json.py --sql "SELECT COUNT(*) AS n FROM [InventorableItems]" --out .\inventorable_count.json
python tools/access-migration/access_query_to_json.py --sql "SELECT TOP 100 * FROM [InventorableItems]" --out .\inventorable_sample.json
python tools/access-migration/access_query_to_json.py --sql-file .\myquery.sql --db "D:\Archive\Other.accdb" --out .\dump.json
```

**Count only (stdout):**

```powershell
python tools/access-migration/access_query_to_json.py --sql "SELECT COUNT(*) AS n FROM [InventorableItems]"
```

## Access SQL tips

- Quote identifiers with spaces or reserved words: **`[My Table]`**.
- Prefer **`SELECT`** for migration; **`TOP N`** helps for smoke tests on large tables.

## Security note

**`--sql` / `--sql-file` are arbitrary SQL** against a local file. Use only on trusted machines and paths; do not pass unsanitized user input into this tool.

## Related

- **Vibram Sales domain + path narrative:** `apps/vibram-sales/docs/BUSINESS-LOGIC.md`
- **Postgres target schema / Supabase:** `.agents/skills/supabase-schema-sync/SKILL.md`, `.agents/skills/drizzle/SKILL.md`
- **Skill index:** `.agents/skills/README.md`
