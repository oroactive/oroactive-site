import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PUBLIC_METALS } from "@/lib/public-quotes";

const fallbackQuotes = [
  { metal: "Oro", priceKg: 74250, currency: "EUR", source: "Dato demo" },
  { metal: "Argento", priceKg: 875, currency: "EUR", source: "Dato demo" }
];

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      where: { metal: { in: [...PUBLIC_METALS] } },
      orderBy: { createdAt: "desc" },
      take: 12
    });

    if (!quotes.length) {
      return NextResponse.json({ ok: true, quotes: fallbackQuotes, live: false });
    }

    const latestByMetal = new Map<string, (typeof quotes)[number]>();
    for (const quote of quotes) {
      if (!latestByMetal.has(quote.metal)) latestByMetal.set(quote.metal, quote);
    }

    return NextResponse.json({
      ok: true,
      live: true,
      quotes: [...latestByMetal.values()].map((quote) => ({
        metal: quote.metal,
        priceKg: Number(quote.priceKg),
        currency: quote.currency,
        source: quote.source || "OroActive",
        updatedAt: quote.createdAt
      }))
    });
  } catch {
    return NextResponse.json({ ok: true, quotes: fallbackQuotes, live: false });
  }
}
