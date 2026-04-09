# Yeble Careers (Vercel + Neon + Blob)

Next.js App Router starter for the Yeble placement platform. Ships job posting + candidate application flows, Prisma schema for Neon, and Blob-backed resume uploads.

## Quickstart
1. Copy envs: `cp .env.example .env.local` and fill `DATABASE_URL` (Neon), `BLOB_READ_WRITE_TOKEN` (Vercel Blob), and later `JOOBLE_API_KEY` when enabling aggregation imports.
2. Install deps: `npm install`.
3. Generate Prisma client: `npx prisma generate`.
4. (Optional) Push schema to Neon: `npx prisma db push`.
5. Run dev server: `npm run dev` → http://localhost:3000.

## Deploy
- Connect the repo to Vercel, set `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` in Project Settings → Environment Variables.
- Neon: create a serverless database, copy the pooled connection string (`?sslmode=require`).
- Blob: enable Vercel Blob; create a Read/Write token.

## Notes
- API routes: `/api/jobs` (GET/POST), `/api/applications` (POST), `/api/upload` (POST multipart), `/api/admin/jobs/import/jooble` (POST admin sync).
- Data model: `Job`, `Candidate`, `Application` in `prisma/schema.prisma`.
- UI: `src/app/page.tsx` includes job posting and application forms with resume upload.

- Job aggregation strategy: keep manual jobs verified and prioritized, import a limited number of Jooble batches for North India only to conserve request quota.

