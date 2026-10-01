import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("the website uses the official logo orange as its shared brand color", () => {
  const logo = read("public/oroactive-logo-ufficiale-20261001.svg");
  assert.match(logo, /fill="#EF500B"/);
  assert.match(read("lib/brand.ts"), /orange: "#EF500B"/);
  assert.match(read("tailwind.config.ts"), /orange: brand.orange/);
  assert.match(read("app/manifest.ts"), /theme_color: brand.orange/);
});

test("orange gradients and hover states no longer use the former yellow-orange palette", () => {
  for (const path of ["tailwind.config.ts", "app/globals.css", "app/manifest.ts", "components/Nav.tsx", "components/OroShopInspiredHome.tsx"]) {
    assert.doesNotMatch(read(path), /#ff7a00|#ff922e|255\s*,\s*122\s*,\s*0/i, path);
  }
  assert.match(read("app/globals.css"), /rgba\(239, 80, 11, \.18\)/);
  assert.match(read("components/OroShopInspiredHome.tsx"), /rgba\(239,80,11,\.18\)/);
});
