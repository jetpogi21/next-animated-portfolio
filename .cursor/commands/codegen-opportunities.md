# Codegen opportunities

This starter **does not** ship **`npm run codegen`** or **`tools/codegen/`**.

## When the user runs `/codegen-opportunities`

1. Read **`.agents/skills/codegen-pattern/SKILL.md`** for principles if introducing codegen later.
2. Today: look for **duplicate constants or parallel config** under **`src/`** that could become **one module** or a small deterministic script — propose a **minimal** plan, not a large refactor, unless the user asks.

If you add a real codegen pipeline, revisit this command and document scripts in **`CLAUDE.md`**.
