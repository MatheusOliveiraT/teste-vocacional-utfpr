import { NextRequest, NextResponse } from "next/server";
import { deleteStudentsByIds } from "@/lib/admin-source";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { ids?: string[] };

  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json(
      { error: "Informe um array `ids` com ao menos um id." },
      { status: 400 }
    );
  }

  await deleteStudentsByIds(body.ids);
  return NextResponse.json({ ok: true });
}
