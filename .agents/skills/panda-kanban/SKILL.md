---
name: panda-kanban
description: >-
  Kanban board feature for panda-realty. Covers the spec, wireframes, data model decisions,
  pipeline stages, and what is in/out of scope. Read whenever working on the Kanban board
  page, pipeline stages, drag-and-drop, or the property detail panel in panda-realty.
user-invocable: true
---

> **Not in this repo:** Panda Realty and **`apps/panda-realty`** do not exist here. Treat everything below as **archived reference** unless you are porting a similar Kanban feature into this portfolio.

# Panda Realty — Kanban Board

## Canonical documents

Always read both files before doing any Kanban-related work:

| File | Purpose |
|---|---|
| `apps/panda-realty/KANBAN-SPEC.md` | Full feature spec — confirmed by client, data model decisions, pipeline stages, open questions, progress tracker |
| `apps/panda-realty/KANBAN-WIREFRAME.md` | Screen-by-screen ASCII wireframes — board layout, card anatomy, detail panel tabs, drag-and-drop, responsive notes |

## What this feature is

A Kanban board page inside panda-realty with **two separate pipelines** — Sellers and Buyers — switchable via tabs. The board is the **default view when the app opens** (always, no per-user persistence).

- **Sellers pipeline:** Cards represent **favourite properties** (`panda_properties.is_favorite = true`) — one card per property, moving through seller stages.
- **Buyers pipeline:** Cards represent **buyer–property deals** (`property_entities` rows) — one card per buyer–property link, each moving independently through buyer stages.

## Key decisions (already confirmed — do not reopen with the client)

- **Two pipelines:** Sellers (10 stages) and Buyers (10 stages) — exact stage names in the spec.
- **Sellers cards = properties** (favourite-flagged only). Stage stored on `panda_properties.property_status_id`.
- **Buyers cards = buyer–property deals** (`property_entities` rows, `entityCategoryId = 1`). One card per deal. A buyer linked to 3 properties = 3 independent cards. Stage stored on `property_entities.buyer_pipeline_status_id`. Cards only appear when that column is non-null.
- **Buyers drag:** Updates `property_entities.buyer_pipeline_status_id` only (not `panda_properties`).
- **Buyers click:** Opens `BuyerDetailPanel` (Overview / Offers / Notes) — not the property detail panel.
- **Conditions sub-stages:** Shown as date fields inside the card detail panel, not as extra columns.
- **Won / Lost:** Boolean flags `is_won` and `is_lost` on `panda_properties` — not pipeline stages. Toggling does not move the card.
- **Filters:** None — all favourites (sellers) / all assigned buyer deals (buyers) are always shown.
- **Default view:** Always opens to Board. No session persistence needed.
- **Call / Email log:** Deferred — omit that tab from the detail panel for now.
- **Sub-pipeline UI:** Progress stepper (not mini Kanban) — 4 linear stages (Offer Accepted → Conditions → Unconditional → Settlement) inside `SummaryTab` of `PropertyDetailPanel`; visible only when an accepted offer exists. Stage stored on `panda_properties.deal_stage_status_id` FK → `property_status` (`pipeline='deal'`). Migration `0019_deal_sub_pipeline.sql`.

## Data model starting points

| What | Where | Notes |
|---|---|---|
| DB schema | `apps/panda-realty/db/schema.ts` | |
| Favourite flag | `panda_properties.is_favorite` | Already exists — board filters on this |
| Property status | `panda_realty.property_status` table | `pipeline` column added (`sellers` \| `buyers` \| null); `sort_order integer` added (1–10 per pipeline); existing statuses (pipeline=null) stay as-is for list view |
| Pipeline stages | See KANBAN-SPEC.md — Pipelines & Stages and Post-implementation corrections | All 20 stages seeded; query orders by `sort_order ASC` |
| Property→contacts | `property_entities` table | Links properties to buyers, sellers, contacts |
| **Buyer pipeline stage** | `property_entities.buyer_pipeline_status_id` | FK → `property_status`; nullable; migration `0018_buyer_pipeline_status_on_property_entities.sql` |
| Offers | `buyer_offers` table | Offer amounts per property-entity link |
| Notes | `property_entity_notes` table | |
| Files | `property_entity_files` table | |
| Won / Lost | `panda_properties.is_won`, `panda_properties.is_lost` | Boolean flags, already added — default false |
| Conditions dates | `panda_properties.cooling_off_date`, `bpi_due_date`, `finance_due_date`, `searches_date`, `balance_deposit_due_date` | Nullable `timestamp` columns; shown in Summary tab when `stageName` includes "Conditions" |
| **Deal stage** | `panda_properties.deal_stage_status_id` | Nullable FK → `property_status` where `pipeline='deal'`; 4 rows (IDs 38–41, sort_order 1–4); migration `0019_deal_sub_pipeline.sql` |

## What is out of scope (do not build)

- Filtering by suburb, agent, or property type
- Call / Email log tab
- Automated notifications or reminders on due dates
- Any public-facing version of this board

## Skills to read alongside this one

- `.agents/skills/drizzle/SKILL.md` — DB schema changes and migrations
- `.agents/skills/tanstack-form/SKILL.md` — forms inside the detail panel
- `.agents/skills/supabase-schema-sync/SKILL.md` — before editing schema or migrations
- `.agents/skills/codebase-change-hygiene/SKILL.md` — post-change cleanup

## Board files

| File | Role |
|---|---|
| `apps/panda-realty/app/admin/properties/page.tsx` | Server component — fetches `fetchPipelineStages`, `fetchFavoritePropertiesForPipeline`, `fetchBuyerCardsForPipeline`; passes to shell |
| `apps/panda-realty/app/admin/properties/board/properties-board-shell.tsx` | Server shell — pipeline tab switcher + passes `cardsMap` + `buyerCardsMap` to client |
| `apps/panda-realty/app/admin/properties/board/queries.ts` | `"server-only"` — `fetchPipelineStages`, `fetchFavoritePropertiesForPipeline` (sellers), `fetchBuyerCardsForPipeline` (buyers) |
| `apps/panda-realty/app/admin/properties/board/kanban-board-client.tsx` | `"use client"` — dual-pipeline: `KanbanColumn`/`KanbanCard` for sellers; `BuyerColumn`/`BuyerKanbanCard` for buyers; `DndContext`; `DragOverlay`; opens `PropertyDetailPanel` or `BuyerDetailPanel` on click |
| `apps/panda-realty/app/admin/properties/board/move-property-action.ts` | `"use server"` — `movePropertyToStage(propertyListId, statusId)` — updates `panda_properties.property_status_id` |
| `apps/panda-realty/app/admin/properties/board/move-buyer-action.ts` | `"use server"` — `moveBuyerToStage(propertyEntityId, statusId)` — updates `property_entities.buyer_pipeline_status_id` |

## Property detail panel files

| File | Role |
|---|---|
| `apps/panda-realty/app/admin/properties/board/panel-queries.ts` | `"use server"` — `fetchPropertyDetail()` (2 round-trips, 5 parallel queries) + `fetchBuyerDetail(propertyEntityId)` |
| `apps/panda-realty/app/admin/properties/board/add-note-action.ts` | `"use server"` — `addPropertyNote()` — works for both property entities (sellers panel) and buyer entities (buyer panel) |
| `apps/panda-realty/app/admin/properties/board/toggle-won-lost-action.ts` | `"use server"` — `togglePropertyWon` / `togglePropertyLost` |
| `apps/panda-realty/app/admin/properties/board/move-deal-stage-action.ts` | `"use server"` — `moveDealToStage(propertyListId, dealStatusId)` — updates `panda_properties.deal_stage_status_id` |
| `apps/panda-realty/app/admin/properties/board/property-detail-panel.tsx` | `"use client"` — 7-tab Sheet for sellers pipeline (Summary, Buyers, Contacts, Notes, Files, Offers, History); includes `DealStepperSection` in Summary tab |
| `apps/panda-realty/app/admin/properties/board/buyer-detail-panel.tsx` | `"use client"` — 3-tab Sheet for buyers pipeline (Overview, Offers, Notes) — opens on buyer card click |

Entity category split for Buyers vs Contacts in `PropertyDetailPanel`: `entityCategoryId === 1` → Buyers tab; all others → Contacts tab.

## Progress tracker

- [x] Extend data model — `pipeline` + `sort_order` on `property_status`; `is_won`/`is_lost` on `panda_properties`; all 20 stages seeded
- [x] Board page shell — List/Board toggle; Sellers/Buyers tabs; 10 columns from DB; horizontally scrollable; QA'd desktop + mobile
- [x] Sellers pipeline — property cards (star + address + price + buyer name + activity dot); `fetchFavoritePropertiesForPipeline`
- [x] Property detail panel — 7-tab Sheet (Summary, Buyers, Contacts, Notes, Files, Offers, History); Won/Lost toggles; Conditions date sub-section; add-note form; loading skeletons; QA'd via Playwright 2026-04-13
- [x] Drag and drop (sellers) — `@dnd-kit`; optimistic update; `movePropertyToStage`; `PointerSensor distance:8`; QA'd 2026-04-13
- [x] Buyers pipeline redesign — `buyer_pipeline_status_id` FK on `property_entities` (migration `0018`); `BuyerCard` type + `fetchBuyerCardsForPipeline`; `BuyerKanbanCard`/`BuyerColumn` components; `moveBuyerToStage` action; `BuyerDetailPanel` (Overview/Offers/Notes); QA'd via Playwright 2026-04-13
- [x] **Sub-pipeline (deal board)** — progress stepper in `SummaryTab`; `deal_stage_status_id` FK on `panda_properties`; 4 deal stages in `property_status` (pipeline='deal', IDs 38–41); `moveDealToStage` server action; `DealStepperSection` component; QA'd via Playwright 2026-04-13.
