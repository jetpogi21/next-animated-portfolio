---
name: admin-entity-mobile-cards
description: >-
  Configures narrow-viewport admin entity list cards in @repo/admin: AdminEntityDefinition.listMobileCard
  grouped layouts, column flags (hide labels, omit empty rows), optional qty+unit line and per-card
  line-total toggle, and compact page title policy. Use when editing mobile card markup, entity
  listMobileCard groups, EntityDataTableMobileCards, admin-entity-list-mobile-card-fields, or Vibram
  itemized-sales–style cards.
user-invocable: true
---

# Admin entity mobile list cards

## When it applies

- Viewport is **compact** (`useCompactAdminListViewport` — max-width **767px** or max-height **640px**): **`AdminEntityAdminListCard`** shows **`EntityDataTableMobileCards`** instead of the data table (unless a docked aggregate footer forces table-only).
- Behavior is **declarative** on **`AdminEntityDefinition`**: **`listMobileCard`**, optional **column** flags, and optional **`AdminEntityPageShell`** **`compactPageTitle`**.

## Source files (read before changing behavior)

| Piece | Location |
|--------|-----------|
| Spec types | **`packages/admin/admin-entity-types.ts`** — **`AdminEntityListMobileCardSpec`**, **`AdminEntityListMobileCardGroupSpec`**, column flags |
| Resolver | **`packages/admin/admin-entity-list-mobile-card-fields.ts`** — **`adminEntityListMobileCardFields`**, throws on invalid specs |
| UI | **`packages/admin/components/admin/entity-data-table-mobile-cards.tsx`** |
| Wiring | **`admin-entity-admin.tsx`** → **`admin-entity-admin-list-card.tsx`** |

## Compact: filter bar vs mobile card list inset

- Default **`CardHeader`** uses **`px-4`**. **`EntityDataTableMobileCards`** uses **`px-1.5`** on its root when **`compactChrome`**.
- On compact, **`AdminEntityAdminListCard`** sets **`CardHeader`** to **`px-1.5`** (and **`min-w-0`**) so the header rows align with the mobile card list — **no** **`-mx-*`** on the filters wrap (**`Card`** is **`overflow-hidden`**; negative margins clip content and break horizontal scrolling in the chip row).
- **`admin-entity-list-mobile-filters-wrap--<slug>`** wraps **`AdminEntityListMobileFiltersBar`** with **`min-w-0 w-full`** so the flex + **`overflow-x-auto`** summary strip keeps a bounded width.

## `listMobileCard` basics

- **`titleColumnKey`**: Prominent top-of-card field; must **not** appear in any group’s **`columnKeys`**.
- **`groups`**: Each group has optional **`heading`**, **`layout`** (**`rows`** | **`grid2`**), **`columnKeys`** (list columns only). Every listed mobile column appears in **exactly one** group (or only as **`mobileQtyUnitLine`** keys — see below).
- **`hideTitleFieldLabel`**: Omit the uppercase label above the title value; keep **`aria-label`** on the value.
- Omit **`groups`** → flat **`columnKeys`** layout (or default first-six list columns).

## Column flags (mobile-only)

- **`listMobileCardHideFieldLabel`**: No **`<dt>`**; value uses **`aria-label`** from column **`label`**.
- **`listMobileCardOmitRowWhenEmpty`**: Skip the row when the raw row value is **null**, **undefined**, or blank **string**. If **every** field in a group is omitted, the **whole section** (including **heading**) is skipped.

## Group extras (`layout: "rows"`)

- **`mobileQtyUnitLine`**: **`{ qtyColumnKey, unitColumnKey, unitFromRelatedEmbed? }`**. Renders one line **`{formattedQty} {unit}`** (e.g. `460.00 PRS`). Uses the top-level row value for **`unitColumnKey`** when present; otherwise optional **`unitFromRelatedEmbed: { embedJsonKey, relatedFieldKey }`** reads the unit from the related embed (camelCase keys), e.g. virtual **`inventoryUnit`** from **`inventory.unit`** when list JSON omits the virtual column. Both **`qtyColumnKey`** / **`unitColumnKey`** are **reserved** (must not appear in **any** group’s **`columnKeys`**). Requires at least one **`columnKeys`** entry in the same group (e.g. amount rows).
- **`mobileLineTotalsToggleForColumnKeys`**: Subset of that group’s **`columnKeys`**. Renders a per-card **Unit | switch | Line** control; the **Switch** is wrapped in **`ClientOnly`** (`@repo/ui/client-only`) so SSR uses a same-size placeholder and the control mounts after hydration. **Line** multiplies those **currency** cells by **qty** from **`mobileQtyUnitLine.qtyColumnKey`** (display-only; **`toFixed(2)`** + same list numeric formatting). **Requires** **`mobileQtyUnitLine`** on the **same** group.

## Page title on compact

- **`AdminEntityPageShell`** **`compactPageTitle`**: **`showUnlessHidden`** (default) vs **`hideUnlessShown`** (Vibram Sales app).
- Entity: **`listHidePageTitleOnCompact`** (opt-out when shell is **showUnlessHidden**) or **`listShowPageTitleOnCompact`** (opt-in when shell is **hideUnlessShown**).

## Product pattern (reference)

**Vibram `itemized-sales`** (`apps/vibram-sales/lib/admin/entities/itemizedSales.ts`): stacked **Product** sections (item → description → optional qty details), **Amounts** with **`mobileQtyUnitLine`** (**`unitFromRelatedEmbed`** → **`inventory.unit`**) + **`mobileLineTotalsToggleForColumnKeys`**. Desktop **`listColumnOrder`** stays unchanged.

## Tests and selectors

- Vitest: **`packages/admin/admin-entity-list-mobile-card-fields.test.ts`**.
- Playwright: compact viewport specs under **`apps/<app>/e2e/`**; stable ids in **`.agents/skills/data-testid/SKILL.md`** (mobile card list, line-totals switch, qty-unit line, etc.).

## Rules of thumb

- Prefer **config** on the entity + resolver over one-off forks of **`EntityDataTableMobileCards`**.
- After resolver or type changes, run **`npm run test:admin`**; after visible mobile behavior, extend **Playwright** per **`.agents/skills/galaxy-testing/SKILL.md`** (**Feature work and E2E (Playwright)**).
