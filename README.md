## Yeble Monorepo

Structure:
- `apps/web`: Next.js (App Router) prepared for Cloudflare deployment with Neon + Prisma + Blob.
- `apps/mobile`: Expo React Native app for iOS/Android.
- `packages/types`: Shared TypeScript models.
- `packages/api-client`: Shared fetch helpers for API routes.
- `packages/ui`: Placeholder for shared UI primitives.

Scripts:
- `npm run dev:web` - start Next.js.
- `npm run build:web` - run the default production build.
- `npm run cf:build` - build the web app for Cloudflare with OpenNext.
- `npm run cf:preview` - preview the Cloudflare worker locally.
- `npm run cf:deploy` - deploy the web app to Cloudflare.
- `npm run dev:mobile` - start Expo Metro.

Setup:
1. Copy `apps/web/.env.example` to `apps/web/.env.local`.
2. From the repo root, run `npm install`.
3. Start the web app with `npm run dev:web`.
4. For mobile, run `cd apps/mobile && npm install`, then `npm run start`.

Cloudflare:
1. Install dependencies from the repo root with `npm install`.
2. Build for Cloudflare with `npm run cf:build`.
3. Preview locally with `npm run cf:preview`.
4. Deploy with `npm run cf:deploy`.
5. Use Cloudflare's Next.js worker pipeline for this app rather than a static export.
