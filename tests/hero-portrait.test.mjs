import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const portraitName = "hero-ritratto-mezzobusto-20260923.png";
const previewHash = "d20fe37ab984b39633cefa67d58ef5918c01d7ed608e6557a1c930e066f58c2a";

test("the outpainted preview retains its checked dimensions and transparency", () => {
  const png = readFileSync(new URL(`public/${portraitName}`, root));
  assert.equal(createHash("sha256").update(png).digest("hex"), previewHash);
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), 1024);
  assert.equal(png.readUInt32BE(20), 1536);
  assert.equal(png[25], 6, "PNG must retain its RGBA transparency");
});

test("desktop and mobile share a single proportional portrait without stretching or cropping", () => {
  const source = readFileSync(new URL("components/OroShopInspiredHome.tsx", root), "utf8");
  assert.ok(!source.includes("/hero-woman-cash.png"), "the previous photo must not remain in either layout");
  const portraits = [...source.matchAll(/<Image\b[\s\S]*?\/>/g)]
    .map(([tag]) => tag).filter((tag) => tag.includes(portraitName));
  assert.equal(portraits.length, 1);
  assert.match(source, /aspect-\[2\/3\]/);
  for (const portrait of portraits) {
    assert.match(portrait, /object-contain/);
    assert.doesNotMatch(portrait, /object-cover|scale-\[|brightness-|contrast-|saturate-/);
  }
});
