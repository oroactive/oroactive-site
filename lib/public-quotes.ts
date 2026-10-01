export const PUBLIC_METALS = ["Oro", "Argento"] as const;
export type PublicQuote = { metal: typeof PUBLIC_METALS[number]; priceKg: number };

// The third website card is an individual gemstone valuation, never a metal price.
export function selectPublicQuotes(data: unknown): PublicQuote[] {
  if (!data || typeof data !== "object") return [];
  const response = data as Record<string, unknown>;
  if (response.live !== true || !Array.isArray(response.quotes)) return [];

  const selected = new Map<PublicQuote["metal"], PublicQuote>();
  for (const item of response.quotes) {
    if (!item || typeof item !== "object") continue;
    const quote = item as Record<string, unknown>;
    const metal = PUBLIC_METALS.find((name) => name === quote.metal);
    if (!metal || selected.has(metal) || typeof quote.priceKg !== "number" || !Number.isFinite(quote.priceKg) || quote.priceKg <= 0) continue;
    selected.set(metal, { metal, priceKg: quote.priceKg });
  }
  return [...selected.values()];
}
