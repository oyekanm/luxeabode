// apps/user-app/src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

// routes that don't need auth
const PUBLIC_ROUTES = [
  "/",
  "/apartments",
  "/login",
  "/register",
  "/api/auth", // better-auth's own routes
  "/api/apartments", // public listing API
  "/api/rooms", // public listing API
];

// routes that are only for guests (redirect to dashboard if logged in)
const GUEST_ONLY_ROUTES = ["/login", "/register"];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isGuestOnlyRoute(pathname: string): boolean {
  return GUEST_ONLY_ROUTES.some((route) => pathname.startsWith(route));
}

type CachedSession = {
  userId: string;
  role: string;
  permissions: string[];
  email: string;
  name: string;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // skip middleware for Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ── Step 1: get session from better-auth ───────────────────────────────────
  // better-auth validates the cookie signature cryptographically
  // this is fast — no DB hit, just HMAC verification
  type Session = {
    user: { id: string; email: string; name: string };
    session: { id: string; expiresAt: string };
  };

  const { data: authData } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );

  const isAuthenticated = !!authData?.session;

  // ── Step 2: handle guest-only routes ──────────────────────────────────────
  if (isGuestOnlyRoute(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // ── Step 3: allow public routes through ───────────────────────────────────
  if (isPublicRoute(pathname)) {
    // attach user info to headers for server components to consume
    const response = NextResponse.next();
    if (authData?.user) {
      response.headers.set("x-user-id", authData.user.id);
      response.headers.set("x-user-email", authData.user.email);
    }
    return response;
  }

  // ── Step 4: protected routes — must be authenticated ──────────────────────
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Step 5: verify against KV cache ───────────────────────────────────────
  // better-auth confirmed the cookie is valid but we cross-check KV
  // to confirm the session hasn't been invalidated (logout, banned, etc.)
  // KV is fast — sub-millisecond from Cloudflare edge
  const sessionId = authData!.session.id;
  const kvUrl = `${process.env.KV_REST_API_URL}/get/session:${sessionId}`;

  const kvResponse = await fetch(kvUrl, {
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    },
  });

  const kvData = (await kvResponse.json()) as { result: string | null };

  // session not in KV — invalidated or never cached (force re-login)
  if (!kvData.result) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    // clear the stale cookie
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("better-auth.session_token");
    return response;
  }

  const cachedSession: CachedSession = JSON.parse(kvData.result);

  // ── Step 6: pass verified user data to the app via headers ────────────────
  const response = NextResponse.next();
  response.headers.set("x-user-id", cachedSession.userId);
  response.headers.set("x-user-email", cachedSession.email);
  response.headers.set("x-user-name", cachedSession.name);
  response.headers.set("x-user-role", cachedSession.role);
  response.headers.set(
    "x-user-permissions",
    JSON.stringify(cachedSession.permissions),
  );

  return response;
}

export const config = {
  matcher: [
    // match all routes except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
