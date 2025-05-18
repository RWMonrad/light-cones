# Light Cones – Utviklingsdokumentasjon

## Prosjektmål
Light Cones er et eksperimentelt, betalt web-app-prosjekt hvor brukere kan utfordre og utforske grensene for lyshastighet, relativitet og tid. Plattformen skal være engasjerende, kunnskapsrik og leken – og la brukerne utfordre etablerte sannheter og lansere egne teorier.

## Hovedområder
- **Simulation Lab:** Interaktive fysikk-simuleringer med visuelle effekter og brukerkontroller.
- **Challenge Arena:** Debatt- og utfordringsplattform for alternative teorier og kreative idéer.
- **Knowledge Portal:** Kraftig søk og AI-drevet kunnskapsbase med RAG (Retrieval-Augmented Generation) via context7.

---

## Teknologi og verktøy
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Universe-inspirert design, Samsung Sans font
- **Backend:** Vercel Edge Functions, Neon Serverless Postgres, Drizzle ORM
- **AI/RAG:** MCP-integrasjon med context7 (Upstash) for oppdatert dokumentasjon og kraftig søk
- **Design:** Ingen Figma, alt bygges direkte i kode

---

## Utviklingsplan
1. Opprettelse av nytt prosjekt og mappe (Light Cones)
2. Installasjon av Next.js, Tailwind CSS, Drizzle ORM, context7, Samsung Sans
3. Oppsett av prosjektstruktur:
   - `/src/app` – Next.js pages og routes
   - `/components` – UI-komponenter
   - `/modules/simulation`, `/modules/challenge`, `/modules/knowledge` – Funksjonsmoduler
   - `/public/fonts/samsung_sans` – Fontfiler
4. Implementasjon av global styling og Samsung Sans font
5. Utvikling av Simulation Lab, Challenge Arena og Knowledge Portal som egne sider/moduler
6. Integrasjon med context7 for RAG og kunnskapssøk
7. Testing, justering og lansering

## Prompter og diskusjoner (historikk)
- Separasjon av server- og klientkomponenter
- Fokus på unik UI/UX, ikke generisk shadcn/ui
- Bruk av Figma UI-kit (Universe) som inspirasjon, men alt bygges i kode
- Integrasjon av context7 for oppdatert dokumentasjon og forskningsbasert søk
- Prosjektet skal være 100% separat fra tidligere BookingSystem-prosjekt
- Samsung Sans skal brukes konsekvent i hele appen
- All utvikling skal kun skje i denne mappen og med denne kodebasen

## MCP/RAG-oppsett
- context7 MCP-server er integrert og brukes til å hente sanntids dokumentasjon og kodeeksempler
- Bruk resolve-library-id og get-library-docs for å hente relevant info
- Alt kunnskapsinnhold og dokumentasjon i appen skal være drevet av context7

## Videre arbeid
- Implementere første fungerende versjon av Simulation Lab
- Lage grunnstruktur for Challenge Arena og Knowledge Portal
- Integrere context7 i alle relevante flows
- Kontinuerlig forbedring av UI/UX og brukeropplevelse

---

**All utvikling, testing og dokumentasjon skal kun skje i Light Cones-prosjektet. Ingen filer, kode eller konfig fra BookingSystem eller andre prosjekter skal brukes.**
