// 5) middleware.ts — /admin ve /api/admin rotalarını koru
// create middleware.ts (kökte)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const isProtected =
    url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/admin");

  if (!isProtected) return NextResponse.next();

  // Eski admin panelleri/rotaları varsa da (ör. /dashboard) kapat:
  const legacyPaths = ["/dashboard", "/old-admin", "/admin-old"];
  if (legacyPaths.some((p) => url.pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const cookie = req.cookies.get("admin_session")?.value;
  const authed = cookie === "ok";
  if (!authed && !url.pathname.startsWith("/admin/login") && url.pathname !== "/api/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/dashboard", "/old-admin", "/admin-old"],
};
