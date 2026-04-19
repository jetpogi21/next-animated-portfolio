# Hydration Errors

Diagnose and fix React hydration mismatch errors.

## Error Signs

- "Hydration failed because the initial UI does not match"
- "Text content does not match server-rendered HTML"

## Debugging

In development, click the hydration error to see the server/client diff.

## Common Causes and Fixes

### Browser-only APIs

```tsx
// Bad: Causes mismatch - window doesn't exist on server
<div>{window.innerWidth}</div>

// Good: Use client component with mounted check
'use client'
import { useState, useEffect } from 'react'

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? children : null
}
```

### Date/Time Rendering

Server and client may be in different timezones:

```tsx
// Bad: Causes mismatch
<span>{new Date().toLocaleString()}</span>

// Good: Render on client only
'use client'
const [time, setTime] = useState<string>()
useEffect(() => setTime(new Date().toLocaleString()), [])
```

### Random Values or IDs

```tsx
// Bad: Random values differ between server and client
<div id={Math.random().toString()}>

// Good: Use useId hook
import { useId } from 'react'

function Input() {
  const id = useId()
  return <input id={id} />
}
```

### Invalid HTML Nesting

```tsx
// Bad: Invalid - div inside p
<p><div>Content</div></p>

// Bad: Invalid - p inside p
<p><p>Nested</p></p>

// Good: Valid nesting
<div><p>Content</p></div>
```

### Third-party Scripts

Scripts that modify DOM during hydration.

```tsx
// Good: Use next/script with afterInteractive
import Script from 'next/script'

export default function Page() {
  return (
    <Script
      src="https://example.com/script.js"
      strategy="afterInteractive"
    />
  )
}
```

### Radix/shadcn Select (Next.js App Router)

Radix **Select** (`SelectTrigger`, ids, `data-state`, etc.) often **does not match** between server-rendered HTML and the first client render. React warns that *attributes of the server rendered HTML didn't match the client*.

**Do this**

1. **Wrap `Select` subtrees in `ClientOnly`** from **`packages/ui/src/client-only.tsx`** (`@repo/ui/client-only`), with a **dimension-matched** fallback (usually `Skeleton` with the same `h-*` / `min-w-*` as the trigger). Server and the client’s **first paint** must both render that fallback; the real `Select` mounts only after `useEffect`.

2. **URL-driven values** (e.g. rows-per-page from `?limit=`): pass **`searchParams` from the RSC page** into the client (serialized query string) so the initial **controlled `value`** matches the request, in addition to `useSearchParams()` for updates. See `serializeAdminEntityPageSearchParams` and `listUrlSearch` on admin entity pages (`packages/admin/admin-entity-page-search-params.ts`, `app/admin/[slug]/page.tsx` in each app).

3. **Do not** wrap a parent in **`next/dynamic` with a `loading` UI** that **omits** the same `Select` tree the client will render first — that reproduces server/client HTML differences.

**Avoid**

- **`Label` `htmlFor`** pointing at a `SelectTrigger` `id` when the trigger is **not** in the DOM during SSR (e.g. `ClientOnly` fallback is a skeleton). Use a plain **`<span>`** for the visible label text, or put **Label + Select** inside the same **`ClientOnly`** branch.

**Reference in this repo**

- `packages/ui/src/client-only.tsx`
- `packages/admin/components/admin/admin-entity-admin-list-card.tsx` (page size + relation filter selects)
- `packages/admin/components/admin/admin-entity-list-filters-toolbar.tsx`
- App Router: `app/admin/[slug]/page.tsx` + `packages/admin/admin-entity-page-search-params.ts` (SSR query string)
