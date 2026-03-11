## Yeble Monorepo

Structure:
- `apps/web`: Next.js (App Router) on Vercel with Neon + Prisma + Blob.
- `apps/mobile`: Expo React Native app for iOS/Android.
- `packages/types`: Shared TypeScript models.
- `packages/api-client`: Shared fetch helpers for API routes.
- `packages/ui`: Placeholder for shared UI primitives.

Scripts:
- `npm run dev:web` — start Next.js.
- `npm run dev:mobile` — start Expo Metro.

Setup:
1) Copy `apps/web/.env.example` to `apps/web/.env.local` and fill `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN`.
2) From repo root: `npm install` (will hoist workspaces), then `npm run dev:web`.
3) For mobile: `cd apps/mobile && npm install` (already done) then `npm run start` and scan with Expo Go.
