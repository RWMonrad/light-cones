| Fil / Mappe                   | TODO                                                 |
| ----------------------------- | ---------------------------------------------------- |
| `src/app/layout.tsx`          | Legg inn `<QueryProvider>` og global Tailwind-import |
| `src/app/api/search/route.ts` | Hent `q` fra body → `vectorQuery(q)` → JSON/SSE      |
| `src/app/api/synth/route.ts`  | Import `planExecuteAgent` fra `/lib/agent.ts`        |
| `lib/db/schema.ts`            | Definer `embeddings` (`vector(4096)`) + `evidence`   |
| `scripts/ingest.ts`           | Crawl → chunk → embed → db.upsert()                  |
| `components/Chat.tsx`         | Stream SSE fra `/api/synth`, vis token + kilder      |
