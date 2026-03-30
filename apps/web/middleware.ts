import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const APPLY_REDIRECT_COOKIE = "yeble_apply_callback";
const redirectablePaths = new Set(["/", "/jobs", "/signin", "/signup", "/auth-complete"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const pendingApplyRedirect = req.cookies.get(APPLY_REDIRECT_COOKIE)?.value;
  const pathname = req.nextUrl.pathname;

  if (userId && pendingApplyRedirect && redirectablePaths.has(pathname)) {
    return NextResponse.redirect(new URL(pendingApplyRedirect, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
