---
name: new-component
description: Scaffold a new React component for this portfolio project, following its conventions (Framer Motion animations, Tailwind CSS, shadcn/ui, TypeScript, "use client" where needed).
disable-model-invocation: false
---

# new-component

Scaffold a new component following this portfolio's patterns.

## Usage

`/new-component <ComponentName> [type]`

- `type`: `ui` (goes in `src/components/ui/`) or `section` (goes in `src/app/_components/` or the relevant route's `_components/`). Defaults to `section`.

## Conventions to follow

- **File location**: `ui` components → `src/components/ui/ComponentName.tsx`. Section/page components → `src/app/<route>/_components/ComponentName.tsx` or `src/app/_components/ComponentName.tsx` for shared ones.
- **"use client"**: Add at the top if the component uses hooks, event handlers, or Framer Motion.
- **Animation**: Wrap animated content in `motion.div` from `framer-motion`. Use `initial`, `animate`, `transition` props. Respect `disableAnimation` prop pattern (see `PageTransitionContainer.tsx`).
- **Styling**: Use Tailwind utility classes + `cn()` from `@/lib/utils`. Use `cva` for variant-driven styles.
- **Types**: Always define a `Props` type. Use `ReactNode` for children.
- **Imports**: Use `@/` path aliases (e.g. `@/lib/utils`, `@/components/ui/Button`).
- **No default exports**: Use named exports (`export const ComponentName`).

## Template

```tsx
"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ComponentNameProps = {
  // props here
  disableAnimation?: boolean;
};

export const ComponentName = ({ disableAnimation = false }: ComponentNameProps) => {
  const animationProps = disableAnimation
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <motion.div className={cn("...")} {...animationProps}>
      {/* content */}
    </motion.div>
  );
};
```

After scaffolding, tell the user the file path and any imports they'll need to add.
