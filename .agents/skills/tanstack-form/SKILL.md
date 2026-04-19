---
name: tanstack-form
description: TanStack Form (@tanstack/react-form) for React in Galaxy — useForm, form.Field, form.Subscribe, async onSubmit, Zod (Standard Schema) or function validators, handleSubmit, reset; Next.js client components, fieldErrorsText, noValidate. Use for client forms, admin dialogs, login, validation UX.
user-invocable: true
---

# TanStack Form (Galaxy + React)

Prefer **current official docs** over memory; APIs evolve. Primary entry points:

- [Framework index](https://tanstack.com/form/latest/docs/framework/react/overview)
- [Quick start](https://tanstack.com/form/latest/docs/framework/react/quick-start) — `useForm`, `form.Field`, `form.handleSubmit()`
- [Basic concepts](https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts)
- [Validation](https://tanstack.com/form/latest/docs/framework/react/guides/validation)
- [Submission handling](https://tanstack.com/form/latest/docs/framework/react/guides/submission-handling) — `onSubmitMeta`, `handleSubmit` metadata
- [React `useForm` reference](https://tanstack.com/form/latest/docs/framework/react/reference/functions/useForm)
- Source package: [`@tanstack/react-form`](https://www.npmjs.com/package/@tanstack/react-form) (peer: `@tanstack/form-core`)

**Installed in this repo:** `@tanstack/react-form` and **`zod`** (Zod implements **Standard Schema** for field/form validators).

## Next.js App Router

- Form hooks run only in **client components** (`"use client"`).
- Do not call `useForm` from Server Components.

## Core patterns (from official quick start)

1. **Create the form** with `useForm({ defaultValues, onSubmit: ({ value }) => { ... } })`.
2. **Submit** from a `<form>`: `e.preventDefault()` and `e.stopPropagation()`, then `void form.handleSubmit()` (supports async `onSubmit` — **await** network work so `isSubmitting` stays accurate until finished).
3. **Fields** via `form.Field` with a render prop: bind `value={field.state.value}`, `onChange` → `field.handleChange(...)`, `onBlur` → `field.handleBlur`, and `name={field.name}` on the control when appropriate.
4. **Validators** on `form.Field` or the form: function validators return a string message or `undefined`; or pass a **Standard Schema** (e.g. Zod schema). Field meta exposes `errors`, `isValid`, etc. (see [FieldApi / meta](https://tanstack.com/form/latest/docs/framework/react/reference/classes/FieldApi)).

## Async submit and loading state

- Use **`form.Subscribe`** with `selector={(s) => s.isSubmitting}` to disable the submit button and swap label (e.g. “Saving…”) while `onSubmit` is in flight.
- Avoid a duplicate `useState` “pending” flag unless you need it for something `isSubmitting` does not cover.

## Native HTML validation (`noValidate`)

If inputs use **`type="email"`** (or other types with browser constraint validation) and validation is owned by TanStack + your schemas, set **`<form noValidate>`**. Otherwise the browser can block submit before `handleSubmit` runs, and custom messages never appear.

## Showing field errors in the UI

- Use **`fieldErrorsText(field.state.meta.errors)`** from `lib/field-errors-text.ts` — it supports **string** errors (function validators) and **Standard Schema issues** (objects with a `message` string).
- Keep user-visible error copy on a **`role="alert"`** element for accessibility and E2E.

## Required fields (label + a11y)

- **Required indicator:** red **`*`** after the label text, wrapped in **`aria-hidden`** so screen readers rely on the control, not the glyph.
- **`aria-required`** on the focused control (**`Input`**, **`Textarea`**, relation **`SelectTrigger`**) matches the same rules as validation.
- **Admin CRUD** (`components/admin/admin-entity-admin-crud-dialog.tsx`): create uses **`optionalOnCreate`**; edit uses **`patchEmptyClears`** (and skips booleans) — see **`adminEntityFieldRequiredOnCreate` / `adminEntityFieldRequiredOnEdit`** in that file.
- **Login** (`components/login-form.tsx`): both fields required; form uses **`noValidate`** — still use **`aria-required`**, not necessarily HTML **`required`**, so submit always reaches TanStack validators.

## Zod (Standard Schema) on fields

- Pass a Zod schema directly: `validators: { onSubmit: myZodSchema }`.
- **Chained checks** like `.min(1).email()` can produce **multiple issues** for one value (e.g. empty string → both “Required”-style and email errors). When you want **at most one** message (empty → Required only; non-empty invalid → email message), use **`z.string().superRefine(...)`** or an equivalent single-path check — see **`lib/login-field-schemas.ts`** (`loginEmailFieldSchema`).
- **`onSubmit` handler `value`** is still the raw form shape; run **`.trim()`** (or Zod transforms) inside `onSubmit` when sending to APIs if the schema does not transform stored field values.

## API / server errors (non-field)

TanStack Form does not replace **mutation error** display for failed sign-in, HTTP errors, etc. Common Galaxy pattern: **`useState` for a submit-level message**, clear it in **`listeners.onChange`** or at the start of `onSubmit`. Admin CRUD dialogs use **TanStack Query** `isError` / `error` on the mutation instead.

## Reset and default values

`FormApi` exposes **`reset(values?, opts?)`**: if `values` are passed, defaults update (see `@tanstack/form-core` `FormApi` JSDoc).

For **modals**, remounting with **`key={...}`** so `useForm` gets fresh `defaultValues` is often simpler than syncing by hand.

## Composition (optional, larger apps)

**`createFormHook` / `createFormHookContexts`** for reusable typed field components — see the [quick start](https://tanstack.com/form/latest/docs/framework/react/quick-start) “best practices” example.

## Related skills

- **data-testid** — stable ids on forms under test (e.g. `/login`: `login-form`, `login-submit`, field errors).
- **galaxy-testing** — Vitest for pure form helpers; Playwright contracts for login and admin dialogs.
- **tanstack-query** — server mutations + cache; keep them out of the form hook except calling `mutate` from `onSubmit`.

## Project usage

| Area | Notes |
|------|--------|
| `components/login-form.tsx` | `useForm` + `form.Field` + **`form.Subscribe`** (`isSubmitting`); Zod schemas from `lib/login-field-schemas.ts`; **`noValidate`**; submit-level auth errors in React state. |
| `lib/login-field-schemas.ts` | `loginEmailFieldSchema` / `loginPasswordFieldSchema` (+ Vitest). |
| `lib/field-errors-text.ts` | Joins `meta.errors` for display (strings + schema issues). |
| `components/admin/admin-entity-admin-crud-dialog.tsx` | Dynamic columns: `useForm` + `form.Field`, **function** `onSubmit` validators (`Required`, etc.), submit body via `lib/admin/admin-entity-crud-form-values.ts`. Field layout: **`grid-template-areas`** via `buildAdminEntityCrudFormGridLayout` + inline **`gridTemplateAreas` / `gridTemplateColumns`** and **`matchMedia`** (viewport **`sm`**, `ADMIN_ENTITY_CRUD_FORM_GRID_BREAKPOINT_MIN_PX`); per-field **`grid-area`** (`f0`…). Eligible **`listManyRelation`** form fields: **`partitionAdminEntityCrudColumnsMainAndManyRelationSide`** + **9fr + 3fr** side rail at **`sm+`**; modal width **`crudDialogWidth`** → **`lib/admin/admin-entity-crud-dialog-width-presets.ts`**. Shell: **`.admin-entity-crud-form-fields-grid`** (gap/padding). |
| `lib/admin/admin-entity-crud-form-values.ts` | `buildAdminEntityCreateBody` / `buildAdminEntityPatchBody` (+ Vitest). |
| `lib/admin/admin-entity-form-grid.ts` | `buildAdminEntityCrudFormGridLayout`, **`ADMIN_ENTITY_CRUD_FORM_GRID_BREAKPOINT_MIN_PX`** (Tailwind **`sm`**). Vitest covers packing + error row. |
| `lib/admin/admin-entity-many-relation-form.ts` | M2M create/edit checkbox eligibility: **`adminEntityColumnShowsManyRelationForm`**, strict vs relaxed junction rules, **`partitionAdminEntityCrudColumnsMainAndManyRelationSide`**, **`manyRelationFormRelatedIdsForJsonBody`** / **`parseManyRelationFormCommaSeparatedIds`**. Vitest: **`lib/admin/admin-entity-many-relation-form.test.ts`**. Server insert/patch + junction sync: **`lib/admin/admin-entity-queries.ts`** (excludes **`listVirtual`** columns from Drizzle payloads). |

**Division of labor:** TanStack Form = **field state + validation**; TanStack Query = **mutations, cache, invalidation** (admin); do not use the form API as a server cache.

## Verification habit

Confirm behavior against the **same major version** in `package.json` and the official links above.
