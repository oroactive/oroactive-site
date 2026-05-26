import OpenAI from "openai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

async function internalContext(question: string) {
  const terms = question
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length > 3)
    .slice(0, 8);

  if (!terms.length) return [];

  return prisma.aiKnowledge.findMany({
    where: {
      approved: true,
      OR: terms.flatMap((term) => [
        { title: { contains: term, mode: "insensitive" as const } },
        { content: { contains: term, mode: "insensitive" as const } },
        { category: { contains: term, mode: "insensitive" as const } }
      ])
    },
    take: 6,
    orderBy: { createdAt: "desc" }
  });
}

export async function POST(request: Request) {
  const { question } = await request.json().catch(() => ({ question: "" }));
  if (!question || typeof question !== "string") {
    return NextResponse.json({ ok: false, error: "Domanda mancante" }, { status: 400 });
  }

  const chunks = await internalContext(question);
  const context = chunks.map((chunk) => `Fonte interna: ${chunk.title}\n${chunk.content}`).join("\n\n---\n\n");

  if (!openai) {
    return NextResponse.json({
      ok: true,
      answer: chunks.length
        ? `Ho trovato materiale interno collegato alla domanda.\n\n${chunks[0].content}`
        : "Non ho trovato una risposta sufficiente nelle fonti interne e l'AI non è configurata.",
      source: chunks.length ? "Fonte: conoscenza OroActive" : "Fonte: fallback interno"
    });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.25,
    messages: [
      {
        role: "system",
        content:
          "Sei l'assistente OroActive per compro oro, formazione e gestione negozio. Rispondi in italiano, in modo professionale e pratico. Usa prima il contesto interno fornito. Se il contesto non basta, dichiaralo chiaramente e dai solo integrazione generale, senza inventare fonti."
      },
      {
        role: "user",
        content: `Domanda: ${question}\n\nContesto OroActive:\n${context || "Nessun contesto interno trovato."}`
      }
    ]
  });

  return NextResponse.json({
    ok: true,
    answer: completion.choices[0]?.message?.content || "Risposta non disponibile.",
    source: chunks.length ? "Fonte: conoscenza OroActive + integrazione AI" : "Fonte: integrazione generale"
  });
}
