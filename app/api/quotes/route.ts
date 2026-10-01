import { NextResponse } from "next/server";
import { getBullionVaultQuotes } from "@/lib/bullionvault";
import { isQuoteLive } from "@/lib/public-quotes";

export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getBullionVaultQuotes();
  const available = snapshot.quotes.length > 0;
  return NextResponse.json({
    ok: available,
    live: snapshot.quotes.length === 2 && snapshot.quotes.every(quote => isQuoteLive(quote)),
    ...snapshot
  }, { status: available ? 200 : 503, headers: { "Cache-Control": "no-store, max-age=0" } });
}
