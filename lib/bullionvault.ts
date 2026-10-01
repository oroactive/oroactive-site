// Public CSV export used by BullionVault's own spot-price chart.
// EUR is selected in the URL; Close (kg) is already EUR/kg, not EUR/troy oz.
const FEEDS = [
  { metal: "Oro", code: "AUX" },
  { metal: "Argento", code: "AGX" }
] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseBullionVaultCsv(csv: string, now = Date.now()) {
  if (csv.length > 100000) throw new Error("BullionVault response too large");
  const [header, ...rows] = csv.trim().split(/\r?\n/);
  if (header?.split(",")[3]?.trim() !== "Close (kg)") throw new Error("Unsupported BullionVault units");
  let latest: { priceKg: number; updatedAt: string } | undefined;
  let latestTime = 0;
  for (const row of rows) {
    const fields = row.split(",");
    const date = /^"(\d{2}):(\d{2}):(\d{2}) (\d{2})-([A-Za-z]{3})-(\d{4})"$/.exec(fields[0]?.trim());
    if (!date || !/^\d+(?:\.\d+)?$/.test(fields[3]?.trim())) continue;
    const [, hour, minute, second, day, month, year] = date;
    const monthIndex = MONTHS.indexOf(month);
    const time = Date.UTC(+year, monthIndex, +day, +hour, +minute, +second);
    const parsed = new Date(time);
    const priceKg = Number(fields[3]);
    if (monthIndex < 0 || +hour > 23 || +minute > 59 || +second > 59 || parsed.getUTCDate() !== +day || parsed.getUTCMonth() !== monthIndex || parsed.getUTCFullYear() !== +year || time > now + 60000 || !Number.isFinite(priceKg) || priceKg <= 0) continue;
    if (time > latestTime) {
      latestTime = time;
      latest = { priceKg, updatedAt: parsed.toISOString() };
    }
  }
  if (!latest) throw new Error("No valid BullionVault price");
  return latest;
}

type Quote = ReturnType<typeof parseBullionVaultCsv> & {
  metal: typeof FEEDS[number]["metal"];
  currency: "EUR";
  source: "BullionVault";
};
type Snapshot = { quotes: Quote[]; checkedAt: string };

// Bound request rate and share concurrent refreshes without a database, API key
// or browser-to-provider connection. Failures are cached briefly too.
export function createBullionVaultService(fetcher: typeof fetch = fetch, now = Date.now) {
  let cached: Snapshot | undefined;
  let expiresAt = 0;
  let pending: Promise<Snapshot> | undefined;

  return async function getQuotes(): Promise<Snapshot> {
    if (cached && now() < expiresAt) return cached;
    if (pending) return pending;
    pending = (async () => {
      const results = await Promise.allSettled(FEEDS.map(async ({ metal, code }): Promise<Quote> => {
        const response = await fetcher(`https://chart-data.bullionvault.com/prices/CSV/${code}/EUR/5/Full`, {
          cache: "no-store",
          redirect: "error",
          signal: AbortSignal.timeout(7000),
          headers: { Accept: "text/csv" }
        });
        if (!response.ok || !response.headers.get("content-type")?.includes("text/csv") || Number(response.headers.get("content-length")) > 100000) throw new Error("BullionVault feed unavailable");
        const price = parseBullionVaultCsv(await response.text(), now());
        return { metal, ...price, currency: "EUR", source: "BullionVault" };
      }));
      cached = { quotes: results.flatMap(result => result.status === "fulfilled" ? [result.value] : []), checkedAt: new Date(now()).toISOString() };
      expiresAt = now() + 10000;
      return cached;
    })();
    try { return await pending; } finally { pending = undefined; }
  };
}

export const getBullionVaultQuotes = createBullionVaultService();
