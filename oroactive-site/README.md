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
