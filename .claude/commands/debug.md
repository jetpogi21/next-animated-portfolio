# Runtime debug trace

Use **`.agents/skills/runtime-debug-instrumentation/SKILL.md`** for **`[gal-debug]`** logging, reproduction order, and cleanup.

## This app

- **URL:** **`npm run dev`** → typically **http://localhost:3000**.
- **Instrument** client components and route handlers under **`src/`**.
- **Collect** logs from the **dev terminal** or browser DevTools.

## Playwright (optional)

If **`e2e/`** exists, disposable specs can register **`page.on('console', …)`** and filter **`[gal-debug]`**. See **`.agents/skills/windows-shell-commands/SKILL.md`**.
