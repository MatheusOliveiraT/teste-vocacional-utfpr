import { NextResponse } from "next/server";
import { fetchExternalTestOptions } from "@/lib/external-api";

export async function GET() {
  try {
    // Chama a external-api que já envia o cookie HttpOnly do servidor Next.js para o Express
    await fetchExternalTestOptions();
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}