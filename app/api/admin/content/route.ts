import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contentSchema = z.object({
  type: z.enum(["blog", "faq", "knowledge"]),
  title: z.string().min(3),
  content: z.string().min(5),
  category: z.string().optional()
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  const [posts, faqs, knowledge] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.faq.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.aiKnowledge.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
  ]);

  return NextResponse.json({ ok: true, posts, faqs, knowledge });
}

export async function POST(request: Request) {
  try {
    const payload = contentSchema.parse(await request.json());
    if (payload.type === "blog") {
      const post = await prisma.blogPost.create({
        data: {
          title: payload.title,
          slug: slugify(payload.title),
          excerpt: payload.content.slice(0, 180),
          content: payload.content,
          category: payload.category || "OroActive",
          published: true
        }
      });
      return NextResponse.json({ ok: true, item: post }, { status: 201 });
    }

    if (payload.type === "faq") {
      const faq = await prisma.faq.create({
        data: {
          question: payload.title,
          answer: payload.content,
          category: payload.category || "Generale"
        }
      });
      return NextResponse.json({ ok: true, item: faq }, { status: 201 });
    }

    const note = await prisma.aiKnowledge.create({
      data: {
        title: payload.title,
        category: payload.category || "OroActive",
        content: payload.content,
        source: "Dashboard contenuti",
        approved: true
      }
    });
    return NextResponse.json({ ok: true, item: note }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Contenuto non salvato" },
      { status: 400 }
    );
  }
}
