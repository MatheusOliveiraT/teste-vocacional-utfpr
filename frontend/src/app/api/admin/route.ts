import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/admin-source";

// Sem isso, o Next.js pré-renderiza esta rota como estática no build
// (ela não lê nenhum dado de request), servindo sempre o mesmo JSON
// "congelado". Forçamos avaliação dinâmica a cada requisição.
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getDashboardData();
  return NextResponse.json(data);
}
