import assert from "node:assert/strict";
import test from "node:test";

const load = () => import("../lib/public-access.ts");
const request = (path, method = "GET") => new Request(`https://www.oroactive.it${path}`, { method });

test("opening the corporate website never opens internal APIs or placeholder business pages", async () => {
  const { publicAccessResponse: guard } = await load();
  for (const path of ["/api/admin/content", "/api/admin/content/", "/%61pi/admin/content", "/api/ai/chat", "/api/lead", "/api/unknown", "/stores/milano", "/blog/quotazione-oro-usato"]) {
    for (const method of ["GET", "HEAD"]) {
      const response = guard(request(path, method), "production");
      assert.equal(response.status, 404, `${method} ${path}`);
      assert.match(response.headers.get("cache-control"), /no-store/);
      assert.equal(response.body, null);
    }
  }
});

test("public pages and quote reads work while no production request can write", async () => {
  const { publicAccessResponse: guard } = await load();
  for (const path of ["/", "/privacy-policy", "/indice-del-sito", "/robots.txt", "/sitemap.xml", "/api/quotes", "/_next/static/app.js"]) {
    assert.equal(guard(request(path), "production"), null, path);
    for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
      const response = guard(request(path, method), "production");
      assert.equal(response.status, 405, `${method} ${path}`);
      assert.equal(response.headers.get("allow"), "GET, HEAD");
    }
  }
});

test("old reserved-area URLs lead only to the real authenticated app", async () => {
  const { publicAccessResponse: guard } = await load();
  for (const path of ["/login", "/dashboard", "/dashboard/private", "/dashboard/?next=https://example.com"]) {
    const response = guard(request(path), "production");
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "https://app.oroactive.it");
  }
  assert.equal(guard(request("/api/admin/content"), "development"), null);
});
