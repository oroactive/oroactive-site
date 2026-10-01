import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("the public website no longer offers Academy, franchising or platinum", () => {
  for (const path of ["components/Nav.tsx", "components/Sections.tsx", "components/OroShopInspiredHome.tsx", "components/QuoteTicker.tsx", "components/Hero.tsx", "components/LoginForm.tsx", "app/layout.tsx", "app/sitemap.ts", "app/dashboard/page.tsx", "app/stores/[city]/page.tsx", "app/api/quotes/route.ts", "lib/data.ts"]) {
    assert.doesNotMatch(read(path), /academy|accademy|franchis|platin/i, path);
  }
  assert.equal(existsSync(new URL("app/academy/page.tsx", root)), false);
  assert.equal(existsSync(new URL("app/api/academy/courses/route.ts", root)), false);
});

test("diamonds have a dedicated valuation card and an existing destination", () => {
  const ticker = read("components/QuoteTicker.tsx");
  const home = read("components/OroShopInspiredHome.tsx");
  assert.match(ticker, /Valutazione dedicata/);
  assert.match(ticker, /href="#valutazione-diamanti"/);
  assert.match(home, /"Diamanti"/);
  assert.match(home, /id=\{title === "Diamanti" \? "valutazione-diamanti"/);
  assert.match(home, /caratura, taglio, colore, purezza/i);
});
