import assert from "node:assert/strict";
import test from "node:test";

test("production is closed by default; local preview remains open; reopening is explicit", async () => {
  const { suspensionResponse } = await import("../lib/site-suspension.ts");
  const request = new Request("https://www.oroactive.it/");
  assert.equal(suspensionResponse(request, "production", undefined).status, 503);
  assert.equal(suspensionResponse(request, "production", "OPEN").status, 503);
  assert.equal(suspensionResponse(request, "production", "open"), null);
  assert.equal(suspensionResponse(request, "development", undefined), null);
  assert.equal(suspensionResponse(request, "development", "closed").status, 503);
});

test("direct pages, APIs, assets and crawler variants cannot expose the closed site", async () => {
  const { suspensionResponse } = await import("../lib/site-suspension.ts");
  for (const path of ["/", "/blog", "/blog/quotazione-oro-usato", "/login", "/dashboard", "/api/quotes", "/api/contact", "/sitemap.xml", "/_next/static/test.js", "/_next/image?url=/hero-ritratto-mezzobusto-20260923.png&w=1024&q=75", "/?preview=true", "/hero-ritratto-mezzobusto-20260923.png"]) {
    const response = suspensionResponse(new Request(`https://www.oroactive.it${path}`), "production", undefined);
    assert.equal(response.status, 503, path);
    assert.match(response.headers.get("cache-control"), /no-store/);
    assert.match(response.headers.get("x-robots-tag"), /noindex/);
    const html = await response.text();
    assert.match(html, /Sito temporaneamente non disponibile/);
    assert.doesNotMatch(html, /Via Gasparoli|349.?310|Quotazione OroActive|api\/quotes|<form|<a\s/);
  }
  const post = suspensionResponse(new Request("https://oroactive.it/api/contact", {method:"POST"}), "production", undefined);
  assert.equal(post.status, 503);
});

test("only branding and the network-only worker remain available; robots has no sitemap", async () => {
  const { suspensionResponse } = await import("../lib/site-suspension.ts");
  const request = path => new Request(`https://oroactive.it${path}`);
  assert.equal(suspensionResponse(request("/oroactive-logo-ufficiale-20261001.svg"), "production", undefined), null);
  const robots = suspensionResponse(request("/robots.txt"), "production", undefined);
  assert.equal(robots.status, 200);
  assert.equal(await robots.text(), "User-agent: *\nDisallow: /\n");
  const worker = suspensionResponse(request("/sw.js"), "production", undefined);
  assert.equal(worker.status, 200);
  assert.match(worker.headers.get("content-type"), /javascript/);
  const js = await worker.text();
  assert.match(js, /skipWaiting/);
  assert.match(js, /startsWith\("oroactive-site-static-"\)/);
  assert.doesNotMatch(js, /localStorage|indexedDB|document.cookie/);
  assert.equal(suspensionResponse(new Request("https://oroactive.it/", {method:"HEAD"}), "production", undefined).body, null);
});
