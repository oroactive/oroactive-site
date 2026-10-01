export const PUBLIC_METALS = ["Oro", "Argento"] as const;
export type PublicQuote = { metal: typeof PUBLIC_METALS[number]; priceKg: number; currency: "EUR"; source: "BullionVault"; updatedAt: string };

export function isQuoteLive(quote: PublicQuote, now = Date.now()) {
  const age = now - Date.parse(quote.updatedAt);
  return age >= -60000 && age <= 120000;
}

// The third website card is an individual gemstone valuation, never a metal price.
export function selectPublicQuotes(data: unknown): PublicQuote[] {
  if (!data || typeof data !== "object") return [];
  const response = data as Record<string, unknown>;
  if (response.ok !== true || !Array.isArray(response.quotes)) return [];

  const selected = new Map<PublicQuote["metal"], PublicQuote>();
  for (const item of response.quotes) {
    if (!item || typeof item !== "object") continue;
    const quote = item as Record<string, unknown>;
    const metal = PUBLIC_METALS.find((name) => name === quote.metal);
    if (!metal || selected.has(metal) || typeof quote.priceKg !== "number" || !Number.isFinite(quote.priceKg) || quote.priceKg <= 0) continue;
    if (quote.currency !== "EUR" || quote.source !== "BullionVault" || typeof quote.updatedAt !== "string" || !Number.isFinite(Date.parse(quote.updatedAt)) || Date.parse(quote.updatedAt) > Date.now() + 60000) continue;
    selected.set(metal, { metal, priceKg: quote.priceKg, currency: "EUR", source: "BullionVault", updatedAt: quote.updatedAt });
  }
  return [...selected.values()];
}
