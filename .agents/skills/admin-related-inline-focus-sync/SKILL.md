---
name: admin-related-inline-focus-sync
description: >-
  Admin CRUD related-collection inline tables — focus loss after keystrokes, related draft sync vs
  Radix Dialog focus scope, and targeted re-renders via `useAdminRelatedInlineDraftSyncVersion`.
  Read when editing `admin-entity-crud-related-collections.tsx`, wiring `onExtrasPayloadSynced`, adding
  registry line post-process that touches parent form, or debugging “only first character types” /
  `fill()` works but `keyboard.type` does not in Playwright.
user-invocable: false
---

# Admin related inline tables — focus and extras sync

## Symptom checklist (do not ignore)

Treat these as **the same class of bug** until proven otherwise:

- **Per-character typing** in an inline cell (text / numeric) **drops focus** after the first character, or only the first character appears in the value.
- **`locator.fill()` works** but **`page.keyboard.type`** / **`pressSequentially`** does not (subsequent keys go to `document.body`, a `div`, or the dialog shell).
- Repro is **inside a CRUD `Dialog`** on a **related collection** tab (`AdminEntityCrudRelatedCollections` / inline TanStack Table rows).

**False leads to deprioritize early:** blaming only product-specific `registryLinesChangePostProcess` / `setFieldValue` if totals did not change — the shared **`lines` → extras ref → `onExtrasPayloadSynced`** path used to bump **parent** React state and re-render the **entire** edit form, which could move focus **without** mutating your obvious field.

## Root cause (mental model)

1. **`updateLine`** / `setLines` updates draft rows.
2. A **`useEffect` on `lines`** writes **`adminEntityCrudExtrasForSaveRef`** synchronously, then calls **`onExtrasPayloadSynced`** (wired to **`notifyAdminRelatedInlineDraftSync`** in the CRUD dialog).
3. **Previously:** that callback incremented **`relatedDraftGeneration`** in **`admin-entity-admin-crud-dialog.tsx`**, re-rendering the **whole** `AdminEntityEditCrudForm` / dialog subtree on every keystroke → **Radix Dialog / focus-scope** could steal **`document.activeElement`** from the cell input.
4. **Now:** the bump is an **external store** (`packages/admin/admin-related-inline-draft-sync.ts`). Only components that call **`useAdminRelatedInlineDraftSyncVersion()`** re-render; the main form no longer re-renders each character.

## Fix pattern (implemented in `@repo/admin`)

**Store + hook:** `packages/admin/admin-related-inline-draft-sync.ts` — `notifyAdminRelatedInlineDraftSync`, `useAdminRelatedInlineDraftSyncVersion`.

**CRUD dialog:** `onExtrasPayloadSynced={notifyAdminRelatedInlineDraftSync}` — **no** `useReducer` draft-gen state on the form.

**Related inline table:** `packages/admin/components/admin/admin-entity-crud-related-collections.tsx`

1. **`RelatedCollectionInlineTable`** subscribes with **`useAdminRelatedInlineDraftSyncVersion`** for focus-restore `useLayoutEffect` and post-process deps.
2. **Capture** the focused related-inline control when mutating a line (element with **`RELATED_INLINE_NAV_TARGET_ATTR`**, plus `clientKey` and `aria-label` for fallback if the DOM node is recreated).
3. **Restore focus after the sync version bump commits:** **`useLayoutEffect` keyed on that version**, then **`requestAnimationFrame`** once and run focus + caret placement. Inputs with **`data-admin-related-inline-preserve-selection`** (related currency / plain numeric / integer text) skip caret moves when focus **never left** the control (avoids `022112`-style append-into-zero). **`markAdminRelatedInlineProgrammaticFocus`** runs immediately before programmatic **`focus()`** so **`AdminEntityCrudCurrencyAmountTextInput`** can skip **`select()`** on that refocus (blur→focus each sync must not re-select-all after every key).

**Computed / after-related / compact read-only UI** that must refresh when extras change: subscribe with **`useAdminRelatedInlineDraftSyncVersion`** (or include the version in `form.Subscribe` selectors) — do **not** rely on the parent form re-rendering.

**Do not** rely on `queueMicrotask` alone after `notifyAdminRelatedInlineDraftSync` for this class of bug.

## E2E contract

For regressions, assert **real typing**, not only `fill()`:

- **`expect(locator).toBeFocused()`** then **`pressSequentially`** / **`keyboard.type`** (including **no artificial delay**) and **`toHaveValue`**.

**Reference:** `apps/vibram-sales/e2e/admin-payments.spec.ts` — Checks tab Bank / Check no. (mocked APIs describe).

## Related skills and rules

- **`.cursor/rules/admin-related-inline-focus.mdc`** — short always-on reminder for agents.
- **`.agents/skills/browser-regression-e2e/SKILL.md`** — focus + portal timing, Playwright-first.
- **`.agents/skills/galaxy-testing/SKILL.md`** — app Playwright config and credentials.
- **`.agents/skills/data-testid/SKILL.md`** — stable **`admin-entity-crud-related-*`** ids for rows/editors.

## When changing product hooks

If you add **`registryLinesChangePostProcess`** / **`registryLinesAsyncChangePostProcess`** that calls **`parentCrudForm.setFieldValue`**, you still share the same **`lines`** effect and related-draft **notify** — run the **typing E2E** for that entity’s related tab when behavior is user-visible.
