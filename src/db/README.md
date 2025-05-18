# Database & Backend Struktur

## Kort oppsummert
- All databasekode og backend-funksjonalitet ligger i `/src/db` og `/src/server`.
- Vi bruker **Drizzle ORM** mot **Neon Serverless Postgres**.
- MCP/context7-integrasjon dokumenteres i egen fil.

## Steg 1: Opprettelse
- Opprett denne mappen for all databasekode.
- Her skal migrasjoner, ORM-modeller og tilkoblingslogikk ligge.

## Videre arbeid
- Neste steg: Opprett `schema.ts` og `client.ts` for Drizzle ORM.
- Koble til Neon og test første spørring.
- Dokumenter alle feil, løsninger og testresultater i denne mappen.
