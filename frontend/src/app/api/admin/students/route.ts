import { NextRequest, NextResponse } from "next/server";
import { upsertStudent } from "@/lib/admin-source";
import { AdminStudentInput } from "@/types";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<AdminStudentInput>;

  if (!body.name || !body.schoolId || !body.schoolLevelId || !body.profileId) {
    return NextResponse.json(
      { error: "Campos obrigatórios: name, schoolId, schoolLevelId e profileId." },
      { status: 400 }
    );
  }

  const student = await upsertStudent({
    id: body.id,
    name: body.name,
    schoolId: body.schoolId,
    schoolLevelId: body.schoolLevelId,
    profileId: body.profileId,
  });

  return NextResponse.json(student, { status: body.id ? 200 : 201 });
}
