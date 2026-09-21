import { NextRequest, NextResponse } from "next/server";
import { deleteStudentById } from "@/lib/admin-source";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await deleteStudentById(params.id);
  return NextResponse.json({ ok: true });
}
