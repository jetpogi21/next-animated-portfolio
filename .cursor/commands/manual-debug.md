# Manual debug

The user reproduces locally; you interpret logs and narrow the fix.

## Steps

1. **Confirm URL** — **`npm run dev`**, default **http://localhost:3000**.
2. **Add minimal `[gal-debug]` logs** (see **`.agents/skills/runtime-debug-instrumentation/SKILL.md`**) — remove before merge.
3. **Server code** — logs appear in the **terminal** running Next dev.
4. **Ask for pasted console/terminal output** when the environment hides it from the agent.

## After

- Remove temporary logs.
- Run **`npm run lint`** and **`npm run build`**.
- When E2E exists, add a regression spec per **`.agents/skills/galaxy-testing/SKILL.md`**.
