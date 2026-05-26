import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const lockSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  metal: z.enum(["Oro", "Argento", "Platino"]).default("Oro"),
  grams: z.number().positive(),
  storeId: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const payload = lockSchema.parse(await request.json());
    const lead = await prisma.lead.create({
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        storeId: payload.storeId || null,
        metal: payload.metal,
        grams: payload.grams,
        message: `Richiesta blocco quotazione ${payload.metal} per ${payload.grams}g`
      }
    });

    return NextResponse.json({
      ok: true,
      lockCode: `OA-LOCK-${lead.id.slice(0, 8).toUpperCase()}`,
      leadId: lead.id
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Blocco quotazione non creato" },
      { status: 400 }
    );
  }
}
