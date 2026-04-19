---
name: windows-shell-commands
description: >-
  Run terminal commands on Windows PowerShell 5.x without cd … && …; prefer the tool
  working_directory or semicolon chaining. Use when user_info is win32 + PowerShell, when
  authoring shell one-liners for agents, or when running npm/npx/git/playwright from the repo.
---

# Windows shell commands (agents)

## When to apply

- **`user_info`** indicates **Windows** (`win32`) and the default shell is **PowerShell** (typically **Windows PowerShell 5.x**).
- You are composing **one-line** shell invocations for **`run_terminal_cmd`**, docs, or copy-paste instructions that might run on that environment.

## Rules

1. **Avoid** **`cd "<path>" && <command>`** on Windows PowerShell 5.x. **`&&`** is **not valid** for chaining statements there, so the line often fails before the real command runs. **PowerShell 7+** (`pwsh`) supports **`&&`**, but **do not assume** the user has it.

2. **Prefer (all platforms):** set the terminal tool’s **`working_directory`** to the repo root (or the correct folder) and run **`npx playwright test …`**, **`npm run …`**, **`git …`**, etc. **without** a leading **`cd`**.

3. **If you must chain in one string on Windows PowerShell 5.x:** use **`;`** — for example:

   ```text
   cd "c:\Users\...\galaxy"; npx playwright test e2e/foo.spec.ts
   ```

   Unlike bash **`&&`**, **`;`** does **not** short-circuit on failure. Rely on exit codes, separate tool steps, or explicit error handling when that matters.

4. On **macOS/Linux** or **pwsh 7+**, **`cd … && …`** is fine; **`working_directory`** remains preferred when the tool supports it.

## Maintenance

This skill is the **only** project reference for this guidance; keep it in sync when shell or agent tooling conventions change.
