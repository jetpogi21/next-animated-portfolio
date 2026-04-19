---
name: tanstack-table
description: TanStack Table v8 headless table logic for React — column definitions, useReactTable, sorting/filtering/pagination/row selection as optional features, integrates with markup and shadcn/ui Data Table patterns. Use for data grids, tables, columns, sorting, filtering, pagination, row selection, or when the user mentions TanStack Table or react-table.
user-invocable: false
---

# TanStack Table (Galaxy project)

## Mental model

TanStack Table is **headless**: it manages state and APIs; you render `<table>` / flex rows / virtualized lists yourself (often with Tailwind and shadcn components).

## Setup pattern

1. Define **columns** with `columnHelper` or `ColumnDef<TData, TValue>[]` (`accessorKey` / `accessorFn`, `header`, `cell`).
2. Call `useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), ... })` — add `getSortedRowModel`, `getFilteredRowModel`, `getPaginationRowModel` only when that feature is enabled.
3. Render `table.getHeaderGroups()` and `table.getRowModel().rows` to build the UI.

## Conventions

- **Typing**: Type `TData` (row shape) and use `ColumnDef<MyRow>[]` for type-safe accessors.
- **Controlled state**: Pass `state` + `onSortingChange` (etc.) when lifting table state for URL sync or persistence.
- **Performance**: For large lists, pair with **TanStack Virtual** or similar; avoid huge DOM without virtualization.
- **shadcn**: Data Table examples compose DropdownMenu, Button, and Checkbox with `useReactTable` — follow the **shadcn** skill when adding those primitives.

## Package

Project dependency: `@tanstack/react-table` (ESM).

## Deep references

[TanStack Table React docs](https://tanstack.com/table/latest/docs/introduction)
