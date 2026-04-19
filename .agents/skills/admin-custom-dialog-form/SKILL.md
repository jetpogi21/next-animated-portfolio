---
name: admin-custom-dialog-form
description: >-
  Replaces the auto-generated admin CRUD dialog form body with a fully custom React component via the
  renderCrudDialogFormBody registry hook. Use when an entity's form needs custom layout, tab groups,
  conditional sections, or field controls not expressible through AdminEntityDefinition config alone.
user-invocable: false
---

# Custom admin dialog form body

## When to use

Use `renderCrudDialogFormBody` when:

- The entity has too many fields to fit the auto-generated grid ergonomically and needs logical tab grouping
- Fields should be conditionally shown/hidden based on other field values
- A section needs custom UI controls beyond what the standard field types provide
- The form layout is fundamentally different from the standard 12-column grid (e.g. an image upload area, a map picker, a rich-text editor)

**Do not use** for minor layout tweaks — prefer `crudFormGroups` + `crudFormGroupsMode: "tabs"` on `AdminEntityDefinition` for grouped tabs within the standard engine.

## How it works

The hook replaces everything **inside** the dialog's `<fieldset>` (the scrollable field region), while preserving:
- Dialog header (title, description)
- Footer (Submit / Cancel / Delete buttons)
- `fieldset disabled` when the form interactions are locked (saving, loading FK options)
- `compactDialogBody` still takes precedence on compact viewports when `crudCompactViewport: "editable"` is set

## Source files

| File | Role |
|------|------|
| `packages/admin/admin-client-registry-context.tsx` | `AdminRenderCrudDialogFormBodyArgs` type + `renderCrudDialogFormBody` on `AdminClientRegistryValue` |
| `packages/admin/components/admin/admin-entity-admin-crud-dialog.tsx` | `customFormBody` computation + conditional render in both `AdminEntityCreateCrudForm` and `AdminEntityEditCrudForm` |

## Args shape

```typescript
type AdminRenderCrudDialogFormBodyArgs = {
  readonly slug: AdminEntitySlug
  readonly variant: "create" | "edit"
  readonly entityRowId: string | null          // null on create
  readonly entityDefinition: AdminEntityDefinition
  readonly form: AdminEntityCrudFormSubscribeApi & { Field: ComponentType<any> }
  readonly listDetailSeed?: Record<string, unknown>  // edit: row data from list
  readonly crudListRelationFieldOptions?: AdminEntityCrudListRelationFieldOptionsMap
}
```

## Registration (in `<App>AdminClientRegistryProvider`)

```tsx
const value = useMemo<AdminClientRegistryValue>(() => ({
  // ...other entries
  renderCrudDialogFormBody: (args) => {
    if (args.slug === "my-entity") {
      return <MyEntityDialogForm {...args} />
    }
    return null
  },
}), [])
```

Return `null` or `undefined` to fall back to the default auto-generated layout for that slug.

## Writing the custom component

The component receives `form` typed as `AdminEntityCrudFormSubscribeApi & { Field: ComponentType<any> }`. Cast it to a local `FormLike` shape for type-safe use of `form.Field`:

```tsx
type FieldApi = {
  state: { value: string; meta: { errors: readonly string[] } }
  handleChange: (v: string) => void
  handleBlur: () => void
}

type FormLike = NonNullable<AdminRenderCrudDialogFormBodyArgs["form"]> & {
  Field: (props: {
    name: string
    validators?: { onSubmit?: (args: { value: string }) => string | undefined }
    children: (field: FieldApi) => ReactNode
  }) => ReactNode
}
```

### Using FK relation selects

`crudListRelationFieldOptions` is pre-fetched by the dialog — pass it directly:

```tsx
const opts = crudListRelationFieldOptions?.["myFkColumnKey"]
<AdminEntityCrudListRelationSelectControl
  baseOptions={opts?.options ?? []}
  optionsPending={opts?.optionsPending ?? false}
  ...
/>
```

Import from `@repo/admin/components/admin/admin-entity-crud-list-relation-select-control`.

### Using timestamp calendar pickers

Import from `@repo/admin/components/admin/admin-entity-crud-timestamp-calendar-control`. Requires a `col: AdminEntityColumn` — get it from the entity definition:

```tsx
const COLS = myEntity.columns as unknown as readonly AdminEntityColumn[]
const getCol = (key: string) => COLS.find(c => c.key === key)!
```

### Submit validation on required fields

Add `validators.onSubmit` to each required `form.Field`:

```tsx
<form.Field
  name="streetAddress"
  validators={{ onSubmit: ({ value }) => value.trim() ? undefined : "Required" }}
>
  {(field) => <Input value={field.state.value} ... />}
</form.Field>
```

## Layout conventions

- Use `Tabs` + `TabsContent` from `@repo/ui/tabs` for logical groupings.
- Each `TabsContent` should have `className="min-h-0 flex-1 overflow-y-auto scrollbar-galaxy"` so the tab fills the dialog height and scrolls independently.
- Use a `grid grid-cols-1 gap-x-4 gap-y-4 p-4 sm:grid-cols-2 lg:grid-cols-3` grid inside each tab.

## data-testid conventions

| Element | testid |
|---------|--------|
| Form root (`<Tabs>`) | `<entity>-dialog-form` |
| Tab trigger | `<entity>-form-tab-trigger--<tab>` |
| Tab content panel | `<entity>-form-tab--<tab>` |
| Field wrapper | `<entity>-form-field--<columnKey>` |
| Field validation error | `<entity>-form-field-error--<columnKey>` |
| Named section (`<section>`) | `<entity>-form-section--<sectionName>` |

## Error display

When `customFormBody` is active, mutation errors and client-side validation errors are rendered **below** the custom body (still inside the `fieldset`) automatically. The custom component does **not** need to render error messages for form submit failures — only inline field validation errors from `field.state.meta.errors`.

## E2E testing

Spec the dialog using mocked list + relation APIs so tests run without `DATABASE_URL`:

```ts
await page.route("**/api/admin/my-entity**", async (route) => {
  await route.fulfill({ status: 200, contentType: "application/json",
    body: JSON.stringify({ items: [], totalCount: 0, limit: 20, totalPages: 0,
      hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null }) })
})
```

Assert: form root testid visible → tab triggers visible → tab content panels → key field wrappers.
For required-field validation: click submit → assert `<entity>-form-field-error--<key>` visible.

## Example

See `apps/panda-realty/components/admin/panda-properties-dialog-form.tsx` and its registration in
`apps/panda-realty/lib/admin/admin-client-registry-provider.tsx`.
E2E spec: `apps/panda-realty/e2e/admin-properties.spec.ts`.
