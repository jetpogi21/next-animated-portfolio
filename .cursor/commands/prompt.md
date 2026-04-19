Generate an optimized context-rich prompt to hand off the current session to a new agent. This is used when you need to continue work in a fresh conversation without losing context.

## Process

### 1. Gather Current Project State

Read the following in parallel:

- `CLAUDE.md` — project guide, tech stack, design direction, key features
- `note.md` — original employer brief and requirements
- List the root directory to see what files/folders exist so far
- List `src/` if it exists to understand what has been built
- List `scripts/` if it exists

### 2. Summarize the Current Session

Reflect on the current conversation and extract:

- **Goal** — what the overall objective is
- **What was decided** — key decisions made this session (tech choices, approach, file structure, etc.)
- **What was built/created** — files written, commands created, config set up
- **What was NOT done yet** — the next step that was about to happen or was explicitly deferred
- **Open questions** — anything unresolved or flagged for later
- **Constraints and rules** — any "do not" rules, preferences, or feedback the user gave

### 3. Output the Prompt

Write a single, dense, self-contained prompt block that:

- Opens with the project identity and mission (1-2 sentences)
- States the tech stack concisely
- States the design system (colors, motion, vibe)
- Lists all key features to build
- Describes what has already been done this session
- States exactly what the new agent should do next
- Includes any critical constraints (do-nots, preferences)
- References key file paths the agent will need to read

**Format the output as a fenced code block** so the user can copy it cleanly:

```
You are continuing work on the Quantum Angels website...
[full prompt body]
```

### Rules

- Be dense — every sentence should carry information. No filler.
- Include exact file paths, URLs, and values (color hex codes, iframe src, etc.) where known
- The new agent should be able to read this prompt and immediately know what to do next without asking clarifying questions
- Do not summarize the conversation history — extract only what is durable and actionable
- Keep it under 600 words so it fits cleanly in a new context window
