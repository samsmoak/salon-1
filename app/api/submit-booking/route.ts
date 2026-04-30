import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const STORE = path.join(process.cwd(), "data", "bookings.json");

async function load(): Promise<unknown[]> {
  try {
    const raw = await fs.readFile(STORE, "utf-8");
    return JSON.parse(raw) as unknown[];
  } catch {
    return [];
  }
}

async function save(rows: unknown[]) {
  await fs.mkdir(path.dirname(STORE), { recursive: true });
  await fs.writeFile(STORE, JSON.stringify(rows, null, 2), "utf-8");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ["category", "service", "firstName", "email", "phone", "preferredDay", "preferredTime"];
    const missing = required.filter((k) => !body?.[k]);
    if (missing.length) {
      return NextResponse.json(
        { ok: false, message: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const entry = {
      id: `bk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      receivedAt: new Date().toISOString(),
      ...body,
    };

    const rows = await load();
    rows.push(entry);
    await save(rows);

    console.log("[booking] saved:", entry.id, entry);

    return NextResponse.json({
      ok: true,
      id: entry.id,
      message: "Booking request received. We'll confirm within 24 hours.",
    });
  } catch (err) {
    console.error("[booking] error:", err);
    return NextResponse.json(
      { ok: false, message: "Could not process request." },
      { status: 500 },
    );
  }
}

export async function GET() {
  const rows = await load();
  return NextResponse.json({ count: rows.length, bookings: rows });
}
