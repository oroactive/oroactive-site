import assert from "node:assert/strict";
import test from "node:test";

const load = () => import("../lib/public-quotes.ts");

test("only gold and silver can be presented as metal quotations", async () => {
  const { selectPublicQuotes } = await load();
  const quotes = selectPublicQuotes({ live: true, quotes: [
    { metal: "Oro", priceKg: 100000 },
    { metal: "Platino", priceKg: 30000 },
    { metal: "Diamanti", priceKg: 12345 },
    { metal: "Argento", priceKg: 1200 }
  ] });
  assert.deepEqual(quotes, [{ metal: "Oro", priceKg: 100000 }, { metal: "Argento", priceKg: 1200 }]);
});

test("demo responses, missing responses and invalid prices are never shown as live prices", async () => {
  const { selectPublicQuotes } = await load();
  for (const data of [null, {}, { live: false, quotes: [{ metal: "Oro", priceKg: 74250 }] }, { live: true, quotes: "invalid" }]) {
    assert.deepEqual(selectPublicQuotes(data), []);
  }
  assert.deepEqual(selectPublicQuotes({ live: true, quotes: [null, { metal: "Oro", priceKg: -1 }, { metal: "Argento", priceKg: Infinity }] }), []);
});

test("each supported metal appears once without changing the source data", async () => {
  const { selectPublicQuotes } = await load();
  const data = { live: true, quotes: [{ metal: "Oro", priceKg: 100000 }, { metal: "Oro", priceKg: 99900 }] };
  const before = JSON.stringify(data);
  assert.deepEqual(selectPublicQuotes(data), [{ metal: "Oro", priceKg: 100000 }]);
  assert.equal(JSON.stringify(data), before);
});
