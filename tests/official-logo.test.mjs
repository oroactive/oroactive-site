import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("the supplied SVG is used unchanged, with a square canvas and no external assets", () => {
  const svg = read("public/oroactive-logo-ufficiale-20261001.svg");
  assert.match(svg, /viewBox="0 0 1000 1000"/);
  assert.doesNotMatch(svg, /<script|<text|<image|href=/i);
  assert.equal(createHash("sha256").update(svg).digest("hex"), "469a73aa1a7b51fa180fc9b01bc69b5913f4725f9f93452e27c8e48a663d07dc");
  assert.equal(read("public/icon.svg"), svg);
});

test("every visible logo uses one shared, proportional SVG component", () => {
  const logo = read("components/BrandLogo.tsx");
  assert.match(logo, /src=\{brand.logoSrc\}/);
  assert.match(logo, /width=\{1000\}/);
  assert.match(logo, /height=\{1000\}/);
  assert.match(logo, /object-contain/);
  for (const path of ["components/Nav.tsx", "components/Hero.tsx", "components/OroShopInspiredHome.tsx", "components/Sections.tsx"]) {
    assert.match(read(path), /<BrandLogo\b/);
    assert.doesNotMatch(read(path), /oroactive-logo\.png/);
  }
});

test("metadata, home-screen icons and static cache use the new logo version", () => {
  assert.match(read("app/layout.tsx"), /icon: brand.logoSrc/);
  assert.match(read("app/page.tsx"), /brand.logoSrc/);
  assert.match(read("app/manifest.ts"), /src: brand.logoSrc/);
  for (const size of [180, 192, 512]) {
    const png = readFileSync(new URL(`public/oroactive-icon-${size}-20261001.png`, root));
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
  const worker = read("public/sw.js");
  assert.match(worker, /oroactive-site-static-v7/);
  assert.match(worker, /oroactive-logo-ufficiale-20261001\.svg/);
  assert.doesNotMatch(worker, /oroactive-logo\.png/);
});
