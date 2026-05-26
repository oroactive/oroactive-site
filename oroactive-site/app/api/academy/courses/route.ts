import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  facultyId: z.string(),
  category: z.string().optional(),
  level: z.enum(["BASE", "INTERMEDIO", "AVANZATO", "MASTER"]).default("BASE"),
  durationMinutes: z.number().int().positive().optional(),
  instructor: z.string().optional(),
  thumbnailUrl: z.string().url().optional(),
  certificationFinal: z.boolean().default(true),
  active: z.boolean().default(true)
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
  const courses = await prisma.course.findMany({
    where: { active: true },
    include: {
      faculty: true,
      modules: {
        include: { lessons: true },
        orderBy: { sortOrder: "asc" }
      }
    },
    orderBy: [{ faculty: { name: "asc" } }, { title: "asc" }]
  });

  return NextResponse.json({ ok: true, courses });
}

export async function POST(request: Request) {
  try {
    const payload = courseSchema.parse(await request.json());
    const course = await prisma.course.create({
      data: {
        title: payload.title,
        slug: slugify(payload.title),
        description: payload.description,
        facultyId: payload.facultyId,
        category: payload.category || null,
        level: payload.level,
        durationMinutes: payload.durationMinutes || null,
        instructor: payload.instructor || null,
        thumbnailUrl: payload.thumbnailUrl || null,
        certificationFinal: payload.certificationFinal,
        active: payload.active
      }
    });

    return NextResponse.json({ ok: true, course }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Corso non creato" },
      { status: 400 }
    );
  }
}
