# OroActive.it

Sito ufficiale OroActive premium, mobile-first e SEO-ready.

## Stack

- Next.js 15
- TypeScript
- TailwindCSS
- Framer Motion
- Prisma ORM
- PostgreSQL
- API REST
- PWA installabile

## Avvio locale

```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

## Build production

```bash
npm run build
npm start
```

## Deploy Coolify

Impostare le variabili:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `OPENAI_API_KEY` se si abilita l'assistente AI

Comando build:

```bash
npm run build
```

Comando start:

```bash
npm start
```

## Note sicurezza

Il service worker cachea solo asset statici del sito pubblico. Non cachea API, dashboard o login.

## Quotazioni BullionVault

`GET /api/quotes` legge i prezzi spot pubblici dal CSV del grafico BullionVault:
`https://chart-data.bullionvault.com/prices/CSV/{AUX|AGX}/EUR/5/Full`.
La colonna `Close (kg)` è in EUR/kg; il timestamp CSV è UTC e viene mostrato in ora italiana.
Non servono chiavi API, credenziali, tabelle Quote o migrazioni del database.

Il browser aggiorna ogni 15 secondi quando visibile. Il server condivide le richieste
contemporanee e limita gli accessi alla fonte con una cache in memoria di 10 secondi,
anche in caso di errore. Le risposte HTTP non sono memorizzate dalla PWA/CDN.
Timeout fonte: 7 secondi. La perdita di un metallo non nasconde l'altro; se entrambi
falliscono, HTTP 503 e nessun prezzo dimostrativo. Dati più vecchi di due minuti
restano visibili con data originale e avviso non-live (inclusi i fine settimana).
I diamanti non usano il feed e mantengono la valutazione individuale.

Fonte tecnica: https://www.bullionvault.com/chart/bullionvaultchart.js
Documentazione: https://www.bullionvault.com/help/spot-price-alerts-charts.html
Il CSV è un'interfaccia pubblica del grafico, non un servizio con SLA: cambi di formato
o indisponibilità devono produrre l'avviso, mai quotazioni inventate o vecchie come live.

Verifiche: `node --test tests/*.test.mjs` con Node 24 (supporto TypeScript nativo),
`node node_modules/typescript/bin/tsc --noEmit --incremental false`,
`node node_modules/eslint/bin/eslint.js app components lib tailwind.config.ts`.
