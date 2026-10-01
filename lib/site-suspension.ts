const logoPath = "/oroactive-logo-ufficiale-20261001.svg";

const holdingPage = `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive"><title>OroActive | Prossima apertura</title>
<link rel="icon" href="${logoPath}">
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;min-height:100svh;display:grid;place-items:center;background:#0b0b0d;color:#faf6ef;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px}
main{width:100%;max-width:680px;text-align:center;padding:clamp(28px,6vw,60px) clamp(20px,5vw,48px);border:1px solid #482b1e;border-radius:28px;background:#121212}
img{display:block;width:132px;height:132px;object-fit:contain;margin:0 auto 28px}.eyebrow{color:#ef500b;text-transform:uppercase;font-size:13px;letter-spacing:.16em;font-weight:800}
h1{font-size:clamp(28px,5vw,40px);line-height:1.15;margin:20px 0}p{font-size:17px;line-height:1.7;color:#d3cbc3;margin:18px 0 0}.line{height:3px;width:48px;margin:28px auto 0;background:#ef500b;border-radius:2px}
</style></head><body><main><img src="${logoPath}" alt="OroActive · Compro Oro" width="132" height="132">
<div class="eyebrow">Prossima apertura</div><h1>Sito temporaneamente non disponibile</h1>
<p>Stiamo preparando il sito ufficiale OroActive.<br>I contenuti saranno disponibili dopo il completamento della costituzione societaria.</p>
<p>Grazie per la pazienza.</p><div class="line" aria-hidden="true"></div></main>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(registrations){for(var registration of registrations){if(new URL(registration.scope).pathname==='/'){registration.update().catch(function(){});}}}).catch(function(){});}</script>
</body></html>`;

// Replace the old cache-first worker without touching cookies, account data or databases.
const networkOnlyWorker = `self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key.startsWith("oroactive-site-static-")).map(key => caches.delete(key)));
  await self.clients.claim();
})()));
`;

/** Closed in production until the owner explicitly sets OROACTIVE_PUBLIC_SITE=open.
 * Development stays accessible; OROACTIVE_PUBLIC_SITE=closed enables local QA.
 */
export function suspensionResponse(request: Request, environment: string | undefined, access: string | undefined): Response | null {
  const closed = access === "closed" || (environment === "production" && access !== "open");
  if (!closed) return null;
  const pathname = new URL(request.url).pathname;
  if (pathname === logoPath && ["GET", "HEAD"].includes(request.method)) return null;
  const headers = new Headers({
    "Cache-Control": "no-store, max-age=0, must-revalidate",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "X-Content-Type-Options": "nosniff"
  });
  if (pathname === "/sw.js" && ["GET", "HEAD"].includes(request.method)) {
    headers.set("Content-Type", "application/javascript; charset=utf-8");
    headers.set("Service-Worker-Allowed", "/");
    return new Response(request.method === "HEAD" ? null : networkOnlyWorker, { status: 200, headers });
  }
  if (pathname === "/robots.txt" && ["GET", "HEAD"].includes(request.method)) {
    headers.set("Content-Type", "text/plain; charset=utf-8");
    return new Response(request.method === "HEAD" ? null : "User-agent: *\nDisallow: /\n", { status: 200, headers });
  }
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Retry-After", "3600");
  headers.set("Content-Security-Policy", "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; worker-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
  return new Response(request.method === "HEAD" ? null : holdingPage, { status: 503, headers });
}
