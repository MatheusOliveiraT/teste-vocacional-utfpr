import { NextRequest, NextResponse } from "next/server";
import { upsertStudent } from "@/lib/admin-store";
import { AdminStudentInput } from "@/types";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<AdminStudentInput>;

  if (!body.name || !body.grade || !body.school) {
    return NextResponse.json(
      { error: "Campos obrigatórios: name, grade e school." },
      { status: 400 }
    );
  }

  const student = await upsertStudent({
    id: body.id,
    name: body.name,
    grade: body.grade,
    school: body.school,
    shift: body.shift,
  });

  return NextResponse.json(student, { status: body.id ? 200 : 201 });
}
