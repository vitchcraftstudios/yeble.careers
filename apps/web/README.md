# Yeble Careers (Cloudflare + Neon + Blob)

Next.js App Router starter for the Yeble placement platform. It includes job posting, candidate applications, Prisma models for Neon, and Blob-backed resume uploads.

## Quickstart
1. Copy `.env.example` to `.env.local`.
2. Fill the required variables, including `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, auth keys, mail keys, and payment keys.
3. Install dependencies from the monorepo root with `npm install`.
4. Generate Prisma with `npx prisma generate`.
5. Run the app with `npm run dev`.

## Deploy To Cloudflare
- Build with `npm run cf:build`.
- Preview locally with `npm run cf:preview`.
- Deploy with `npm run cf:deploy`.
- Add the same environment variables to Cloudflare before deploying.
- Use Neon with a pooled connection string that includes `?sslmode=require`.
- If you keep Vercel Blob for uploads, provide a valid `BLOB_READ_WRITE_TOKEN`.

## Why This Is Not A Static Pages Export
- This app uses Prisma, Clerk, NextAuth, uploads, email delivery, and payment routes.
- Because of that, it should run through Cloudflare's Next.js worker support with OpenNext instead of being treated as a static-only Pages site.

## Notes
- API routes: `/api/jobs`, `/api/applications`, `/api/upload`, `/api/admin/jobs/import/jooble`.
- Data model: `Job`, `Candidate`, `Application` in `prisma/schema.prisma`.
- Job aggregation stays manual-first, with optional Jooble imports for a limited region and quota footprint.
