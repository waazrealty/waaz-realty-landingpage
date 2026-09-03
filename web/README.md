# Waaz Realty

The Waaz Realty website is a Next.js application backed by Sanity CMS. The frontend lives in
`web/`, while the Sanity Content Studio lives in `studio/`.

## Requirements

- Node.js 20 or newer
- npm
- A Sanity project, if you need to edit or publish content

## Frontend setup

From the `web/` directory:

```bash
npm install
npm run dev
```

The development site runs at [http://localhost:3000](http://localhost:3000).

Available frontend scripts:

```bash
npm run dev      # start the development server
npm run build    # create a production build
npm run start    # serve the production build
npm run lint     # run Next.js linting
```

## Environment variables

Create `web/.env.local` when using a different Sanity project or dataset:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=8f691khx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-08-07
```

The frontend has these same values as defaults, so the file is optional for the configured
project. Public Sanity values are safe to expose in browser code; do not put private tokens in
`NEXT_PUBLIC_*` variables.

## Sanity Studio

Install and run the Studio separately from the repository root:

```bash
cd studio
npm install
npm run dev
```

The Studio uses project `8f691khx` and dataset `production`. Use `npm run build` to build it or
`npm run deploy` to deploy it through the Sanity CLI.

## Project layout

```text
web/src/pages/       Next.js pages and API routes
web/src/components/  Shared React components
web/src/lib/         Sanity client and application utilities
web/public/          Static assets and local fonts
studio/schemaTypes/  Sanity document and object schemas
```

Add local `.ttf` files to `web/public/fonts/`; see `web/public/fonts/README.md` for the asset
conventions.
