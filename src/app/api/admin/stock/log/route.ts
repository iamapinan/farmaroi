import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/stock/log
// Get history logs
export async function GET() {
  try {
    const logs = await prisma.stockCheckLog.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}

// POST /api/admin/stock/log
// Create a new log snapshot
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body; // Array of names of OUT OF STOCK items

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const log = await prisma.stockCheckLog.create({
      data: {
        items: JSON.stringify(items),
        date: new Date(),
      }
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("Error creating log:", error);
    return NextResponse.json({ error: "Failed to create log" }, { status: 500 });
  }
}
