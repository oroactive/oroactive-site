import assert from "node:assert/strict";
import test from "node:test";

const load = () => import("../lib/public-quotes.ts");
const quote = (metal, priceKg) => ({ metal, priceKg, currency: "EUR", source: "BullionVault", updatedAt: new Date().toISOString() });

test("only gold and silver can be presented as metal quotations", async () => {
  const { selectPublicQuotes } = await load();
  const input = [quote("Oro", 100000), quote("Platino", 30000), quote("Diamanti", 12345), quote("Argento", 1200)];
  assert.deepEqual(selectPublicQuotes({ ok: true, quotes: input }), [input[0], input[3]]);
});

test("demo responses, missing responses and invalid prices are never shown as live prices", async () => {
  const { selectPublicQuotes } = await load();
  for (const data of [null, {}, { live: false, quotes: [{ metal: "Oro", priceKg: 74250 }] }, { live: true, quotes: "invalid" }]) {
    assert.deepEqual(selectPublicQuotes(data), []);
  }
  assert.deepEqual(selectPublicQuotes({ ok: true, quotes: [null, quote("Oro", -1), quote("Argento", Infinity)] }), []);
});

test("each supported metal appears once without changing the source data", async () => {
  const { selectPublicQuotes } = await load();
  const data = { ok: true, quotes: [quote("Oro", 100000), quote("Oro", 99900)] };
  const before = JSON.stringify(data);
  assert.deepEqual(selectPublicQuotes(data), [data.quotes[0]]);
  assert.equal(JSON.stringify(data), before);
});

test("currency, source and timestamp must be verified before a price is displayed", async () => {
  const { selectPublicQuotes } = await load();
  for (const fields of [{ currency: "USD" }, { source: "Dato demo" }, { updatedAt: "invalid" }, { updatedAt: new Date(Date.now() + 86400000).toISOString() }]) {
    assert.deepEqual(selectPublicQuotes({ ok: true, quotes: [{ ...quote("Oro", 100000), ...fields }] }), []);
  }
});

test("weekend, delayed and aged client data remains explicitly non-live", async () => {
  const { isQuoteLive, selectPublicQuotes } = await load();
  const item = quote("Oro", 100000);
  const time = Date.parse(item.updatedAt);
  assert.equal(isQuoteLive(item, time + 15000), true);
  assert.equal(isQuoteLive(item, time + 120001), false);
  assert.equal(isQuoteLive(item, time + 86400000), false);
  assert.equal(isQuoteLive(item, time - 60001), false);
  assert.deepEqual(selectPublicQuotes({ ok: true, live: false, quotes: [item] }), [item]);
});
