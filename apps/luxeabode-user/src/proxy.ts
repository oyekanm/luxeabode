// apps/user-app/src/proxy.ts  (renamed from middleware.ts)
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

const PROTECTED_ROUTES = ["/account", "/become-a-host"];
const GUEST_ONLY_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: "luxeabode",
  });

  const { pathname } = request.nextUrl;

  // proxy is ONLY for routing decisions — redirects and rewrites
  // no auth logic, no DB calls, no KV calls here
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isGuestOnly = GUEST_ONLY_ROUTES.some((r) => pathname.startsWith(r));

  // read the auth cookie — just check existence, not validity
  // actual validation happens at the route/server component level
  if (isProtected && !sessionCookie) {
    const url = new URL("/auth/sign-in", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // if (isGuestOnly && hasSession) {
  //   return NextResponse.redirect(new URL("/account", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
