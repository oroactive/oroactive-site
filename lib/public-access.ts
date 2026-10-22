/** The public website has no authenticated CMS or customer submission flow.
 * Keep the unfinished internal routes unavailable when opening marketing pages.
 * This runs before route handlers, so no database or AI service is contacted.
 */
export function publicAccessResponse(request: Request, environment: string | undefined): Response | null {
  if (environment !== "production") return null;
  let pathname: string;
  try {
    pathname = decodeURIComponent(new URL(request.url).pathname).replace(/\/+$/, "") || "/";
  } catch {
    return new Response(null, { status: 400 });
  }
  const headers = {
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "X-Content-Type-Options": "nosniff"
  };
  if (!["GET", "HEAD"].includes(request.method)) {
    return new Response(null, { status: 405, headers: { ...headers, Allow: "GET, HEAD" } });
  }
  if (pathname === "/login" || pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return new Response(null, { status: 307, headers: { ...headers, Location: "https://app.oroactive.it" } });
  }
  if ((pathname === "/api" || pathname.startsWith("/api/")) && pathname !== "/api/quotes") {
    return new Response(null, { status: 404, headers });
  }
  // These draft pages contain placeholder addresses/articles, not verified business information.
  if (["/stores", "/blog"].some(prefix => pathname === prefix || pathname.startsWith(prefix + "/"))) {
    return new Response(null, { status: 404, headers });
  }
  return null;
}
