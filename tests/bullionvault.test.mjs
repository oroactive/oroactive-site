import assert from "node:assert/strict";
import test from "node:test";

const load = () => import("../lib/bullionvault.ts");
const now = Date.parse("2026-10-01T13:07:42Z");
const header = '"Date",High (kg),Low (kg),Close (kg),,High (troy oz),Low (troy oz),Close (troy oz),';
const csv = `${header}\n"13:07:35 01-Oct-2026",119010,118990,119000,,3701,3700,3701,\n"13:07:40 01-Oct-2026",119010,118990,119003.13,,3701.41,3700,3701.41,\n`;

test("reads the newest close in EUR per kilogram, not ounces or high/low, with the source UTC timestamp", async () => {
  const { parseBullionVaultCsv } = await load();
  assert.deepEqual(parseBullionVaultCsv(csv, now), { priceKg: 119003.13, updatedAt: "2026-10-01T13:07:40.000Z" });
});

test("rejects wrong units, HTML, invalid prices/dates and future timestamps", async () => {
  const { parseBullionVaultCsv } = await load();
  for (const input of ["<html>Error</html>", csv.replace("Close (kg)", "Close (oz)"), `${header}\n"13:07:40 01-Oct-2026",1,1,-1`, `${header}\n"13:07:40 01-Oct-2026",1,1,NaN`, `${header}\n"13:07:40 31-Feb-2026",1,1,100`, `${header}\n"13:07:40 02-Oct-2026",1,1,100`]) {
    assert.throws(() => parseBullionVaultCsv(input, now));
  }
});

test("old source data keeps its original time rather than becoming falsely live", async () => {
  const { parseBullionVaultCsv } = await load();
  assert.equal(parseBullionVaultCsv(csv, now + 86400000).updatedAt, "2026-10-01T13:07:40.000Z");
});

test("real fetch contract uses only fixed BullionVault EUR feeds, deduplicates requests and refreshes the cache", async () => {
  const { createBullionVaultService } = await load();
  let clock = now;
  const calls = [];
  const getQuotes = createBullionVaultService(async (url, options) => {
    calls.push(url);
    assert.equal(options.cache, "no-store");
    assert.equal(options.redirect, "error");
    assert.ok(options.signal);
    return new Response(url.includes("/AUX/") ? csv : csv.replaceAll("119003.13", "1739.63"), { headers: { "content-type": "text/csv" } });
  }, () => clock);
  const [one, two] = await Promise.all([getQuotes(), getQuotes()]);
  assert.deepEqual(one, two);
  assert.deepEqual(calls.sort(), ["https://chart-data.bullionvault.com/prices/CSV/AGX/EUR/5/Full", "https://chart-data.bullionvault.com/prices/CSV/AUX/EUR/5/Full"]);
  assert.equal(one.quotes.length, 2);
  assert.equal(one.quotes[0].source, "BullionVault");
  assert.equal(one.quotes[1].priceKg, 1739.63);
  await getQuotes();
  assert.equal(calls.length, 2);
  clock += 15000;
  await getQuotes();
  assert.equal(calls.length, 4);
});

test("a failing metal does not hide the other; total failures return no demo prices and are throttled", async () => {
  const { createBullionVaultService } = await load();
  const partial = createBullionVaultService(async url => url.includes("/AUX/") ? new Response(csv, { headers: { "content-type": "text/csv" } }) : new Response("unavailable", { status: 503 }), () => now);
  assert.deepEqual((await partial()).quotes.map(q => q.metal), ["Oro"]);
  let calls = 0;
  const failed = createBullionVaultService(async () => { calls++; throw new Error("network timeout"); }, () => now);
  assert.deepEqual((await failed()).quotes, []);
  await failed();
  assert.equal(calls, 2);
});

test("unexpected upstream content and oversized responses never become prices", async () => {
  const { createBullionVaultService } = await load();
  for (const response of [new Response(csv, { headers: { "content-type": "text/html" } }), new Response("x".repeat(100001), { headers: { "content-type": "text/csv" } }), new Response(csv, { headers: { "content-type": "text/csv", "content-length": "100001" } })]) {
    const service = createBullionVaultService(async () => response.clone(), () => now);
    assert.deepEqual((await service()).quotes, []);
  }
});
