# Test av Challenge Arena API-endepunkt

## Hensikt
Teste at API-endepunktet `/src/server/challengeApi.ts` fungerer for både GET og POST mot challenges-tabellen i databasen.

## Testplan
1. Kall GET – forventer å få ut alle challenges fra databasen.
2. Kall POST med `{ content: "Test challenge" }` – forventer at ny challenge opprettes og returneres.
3. Kall POST uten content – forventer 400-feil.
4. Kall med annen metode (PUT, DELETE) – forventer 405-feil.

## Resultater
- [ ] GET OK
- [ ] POST OK
- [ ] POST uten content gir 400
- [ ] PUT/DELETE gir 405

## Feil og løsninger
*Ingen feil registrert ennå.*

---
Oppdater denne filen etter hver test og ved feilretting!
