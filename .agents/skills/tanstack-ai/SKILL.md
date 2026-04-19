---
name: tanstack-ai
description: TanStack AI (@tanstack/ai, @tanstack/ai-react) for streaming chat and tools in Next.js App Router apps. This starter does not ship TanStack AI — read when adding it.
---

# TanStack AI (reference)

> **This portfolio starter** does not include **`@tanstack/ai`**. The rest of this file is **reference** from another product. Skip unless you add TanStack AI here.

## When to use

Triggers on **TanStack AI**, **`@tanstack/ai`**, **`useChat`**, **AI tools**, **streaming chat API**, or **Vibram Sales data assistant**.

## Packages (Vibram Sales)

- **`@tanstack/ai`** — `chat()`, `toolDefinition`, `maxIterations`, `toServerSentEventsResponse`.
- **`@tanstack/ai-react`** — `useChat`, `createChatClientOptions`, `fetchServerSentEvents`.
- **`@tanstack/ai-openai`** — `openaiText`, `OPENAI_CHAT_MODELS`, optional `createOpenaiChat(model, apiKey)`.

Install (workspace already uses **`--legacy-peer-deps`** for this app because **`@tanstack/ai-openai`** peers **`zod@^4`** while apps still ship **Zod 3**):

```bash
npm install @tanstack/ai @tanstack/ai-react @tanstack/ai-openai -w vibram-sales --legacy-peer-deps
```

## Next.js App Router pattern

1. **Route** — `POST` handler, authenticate at the boundary (`getSessionUser` or equivalent), read `OPENAI_API_KEY`, parse JSON body `{ messages, data? }` (same shape the client sends).
2. **Stream** — `const stream = chat({ adapter: openaiText(model), systemPrompts: [...], messages, tools, agentLoopStrategy: maxIterations(n), temperature })` then `return toServerSentEventsResponse(stream, { abortController })`.
3. **System prompts** — use `systemPrompts: string[]` on `chat()`; do not use a fake `system` role in `messages` if the adapter types omit it.
4. **Tools** — `toolDefinition({ name, description, inputSchema, outputSchema }).server(async (raw) => ...)` with **read-only** Drizzle queries; prefer **whitelisted tools** over free-form SQL. **`inputSchema` / `outputSchema`** must reach the provider as real **JSON Schema** (**`type: "object"`**, `properties`, `required`, `additionalProperties: false`). **Zod 3** is not Standard JSON Schema for TanStack’s converter — OpenAI may return **400** (`type: "None"`). Use plain **`JSONSchema`** objects (see **`apps/vibram-sales/lib/sales-chat/data-chat-tools.server.ts`**) or **Zod 4+** / ArkType / Valibot per TanStack docs.
5. **Typing** — OpenAI adapters expect modality-constrained messages; it is normal to assert client `messages` when wiring (e.g. `as never`) after validation.

## Client pattern

```ts
import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat,
} from "@tanstack/ai-react"

const options = createChatClientOptions({
  connection: fetchServerSentEvents("/api/sales-chat"),
})

const { messages, sendMessage, isLoading, error, stop, clear } = useChat(options)
```

Render **`UIMessage`** text from `message.parts` where `part.type === "text"`. The Vibram Sales sheet runs **`normalizeAssistantMathMarkdown`** (maps mistaken **`[ \\LaTeX ]`** blocks to **`$$`**) then **`react-markdown`** + **`remark-gfm`**, **`remark-math`** (`singleDollarTextMath: false`), **`rehype-katex`**, and **`katex/dist/katex.min.css`**; single **`$`** is intentionally disabled to avoid currency false positives.

## Env (Vibram Sales)

- **`OPENAI_API_KEY`** — required for **`POST /api/sales-chat`** (503 if missing).
- **`VIBRAM_SALES_CHAT_MODEL`** — optional; must be in **`OPENAI_CHAT_MODELS`** or the route falls back to **`gpt-4o-mini`**.

## References

- App UI: **`apps/vibram-sales/components/sales-chat/vibram-sales-data-chat.tsx`**
- API: **`apps/vibram-sales/app/api/sales-chat/route.ts`**
- Tools + schema context: **`apps/vibram-sales/lib/sales-chat/`**
- Stable selectors: **`.agents/skills/data-testid/SKILL.md`** (`vibram-sales-data-chat-*`).
