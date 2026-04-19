---
name: tanstack-query
description: TanStack Query (React Query) for this Next.js App Router project — QueryClientProvider in components/query-provider.tsx, client hooks (useQuery, useMutation, useInfiniteQuery), stable query keys, server prefetch + dehydrate when needed. Use for fetching, caching, mutations, invalidation, loading/error states, or when the user mentions React Query, TanStack Query, or queryClient.
user-invocable: false
---

# TanStack Query (Galaxy project)

## Project wiring

| Path | Role |
|------|------|
| `components/query-provider.tsx` | Client `QueryClientProvider` (one `QueryClient` per browser session via `useState`) |
| `app/layout.tsx` | Wraps app with `QueryProvider` inside `ThemeProvider` |

`useQuery`, `useMutation`, and related hooks run only in **client components** (`"use client"`).

## Conventions

- **Query keys**: Use arrays, hierarchical and specific — e.g. `["posts"]`, `["posts", postId]`, `["posts", postId, "comments"]`. Colocate key factories in a small module when reused.
- **Server data**: Prefer fetching in Server Components when you do not need client cache or mutations; use TanStack Query when you need refetch, deduplication across mounts, mutations, or optimistic updates.
- **Mutations**: Call `queryClient.invalidateQueries({ queryKey: [...] })` (or `setQueryData`) after success; use `onMutate` + rollback for optimistic UX when appropriate.
- **Defaults**: Tune `staleTime` / `gcTime` per query; avoid refetching on every focus for stable data if not needed (`refetchOnWindowFocus`).

## Next.js App Router

- RSC pages/layouts cannot call hooks; pass server-fetched data as props or prefetch on the server with a `QueryClient`, `dehydrate`, and `HydrationBoundary` if you need SSR + client cache continuity (see official SSR guide).

## Deep references

[TanStack Query React docs](https://tanstack.com/query/latest/docs/framework/react/overview)
