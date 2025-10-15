import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const locations = await prisma.location.findMany({
      include: { openingHours: { orderBy: { weekday: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(locations);
  } catch {
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { openingHours, ...data } = await req.json();
    const location = await prisma.location.create({
      data: {
        ...data,
        openingHours: openingHours ? { create: openingHours } : undefined,
      },
      include: { openingHours: true },
    });
    return NextResponse.json(location, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create location" }, { status: 500 });
  }
}

