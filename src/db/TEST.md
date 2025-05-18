# Test av Drizzle ORM + Neon-tilkobling

## Hensikt
Teste at Drizzle ORM er riktig konfigurert mot Neon Serverless Postgres, og at tabellen `challenges` kan opprettes og leses fra.

## Testplan
1. Kjør migrering med Drizzle CLI for å opprette tabellen.
2. Lag en enkel testkode for å skrive og lese en "challenge".
3. Dokumenter eventuelle feil og løsninger her.

## Kommando for migrering
```bash
drizzle-kit generate:pg && drizzle-kit push:pg
```

## Resultater
- [ ] Migrering OK
- [ ] Kan skrive til database
- [ ] Kan lese fra database

## Feil og løsninger
*Ingen feil registrert ennå.*

---
Oppdater denne filen etter hver test og ved feilretting!
