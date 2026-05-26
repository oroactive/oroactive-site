import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  storeId: z.string().optional(),
  message: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const payload = leadSchema.parse(await request.json());
    const lead = await prisma.lead.create({
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        storeId: payload.storeId || null,
        message: payload.message || null,
        source: "oroactive.it"
      }
    });

    return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Richiesta non valida" },
      { status: 400 }
    );
  }
}
