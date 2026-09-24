import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const isLoginPage = request.nextUrl.pathname === "/administracao/login";

  // Se o usuário tenta acessar /administracao e não possui o cookie de sessão
  if (!token && request.nextUrl.pathname.startsWith("/administracao") && !isLoginPage) {
    const loginUrl = new URL("/administracao/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se já está autenticado e tenta ir para a tela de login
  if (token && isLoginPage) {
    const adminUrl = new URL("/administracao", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/administracao/:path*"],
};