"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { NAV_LINKS, VESTIBULAR_LINK } from "@/data/navigation";

/**
 * Cabeçalho fixo com logo, navegação principal, atalho para Vestibular & SISU,
 * e ações de autenticação (Login / Logout) com navegação administrativa.
 */
export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [hasMounted, setHasMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Garante a montagem correta no client-side para evitar problemas de hidratação
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Verifica se o usuário possui sessão ativa
  useEffect(() => {
    if (!hasMounted) return;

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin", {
          method: "GET",
          cache: "no-store",
        });
        setIsAuthenticated(res.ok);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, [pathname, hasMounted]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      await fetch(`${apiUrl}/api/dashboard/admin/logout`, {
        method: "POST",
        credentials: "include",
      });

      document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsAuthenticated(false);

      if (pathname.startsWith("/administracao")) {
        router.push("/administracao/login");
      }
      router.refresh();
    } catch (error) {
      console.error("Erro ao encerrar a sessão:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-base/95 backdrop-blur-md border-b border-border-subtle w-full">
      <div className="h-16 w-full max-w-[1140px] mx-auto px-4 md:px-gutter-desktop flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo / Marca */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="h-8 w-8 rounded bg-primary-container flex items-center justify-center shrink-0">
              <span className="font-headline-sm text-[13px] font-bold text-on-primary-container">
                UTF
              </span>
            </div>
            <span className="hidden xs:inline-block font-headline-sm text-headline-sm text-text-high-contrast tracking-tight whitespace-nowrap">
              Teste Vocacional
            </span>
          </Link>
          <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded bg-surface-track border border-border-subtle font-label-sm text-label-sm text-text-muted uppercase tracking-wider whitespace-nowrap">
            Câmpus Campo Mourão
          </span>
        </div>

        {/* Links de Navegação Principal */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-space-lg">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "font-label-lg text-label-lg transition-colors whitespace-nowrap",
                  isActive
                    ? "text-primary-container font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Área de Ações e Autenticação */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href={VESTIBULAR_LINK.href}
            className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg border border-border-subtle bg-surface-track text-text-high-contrast hover:border-primary-container hover:text-primary-container font-label-md text-label-md transition-all whitespace-nowrap"
          >
            {VESTIBULAR_LINK.label}
          </Link>

          {/* Renderização do Botão de Login / Logout */}
          {hasMounted && isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-status-error/30 bg-status-error/10 text-status-error hover:bg-status-error/20 font-label-md text-label-md transition-all cursor-pointer disabled:opacity-50 shrink-0 whitespace-nowrap"
              title="Sair do painel administrativo"
            >
              <Icon name="logout" className="text-[18px]" />
              <span className="font-semibold">{isLoggingOut ? "Saindo..." : "Sair"}</span>
            </button>
          ) : (
            <Link
              href="/administracao/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary-container/40 bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-surface-base font-label-md text-label-md transition-all shrink-0 whitespace-nowrap font-semibold"
              title="Acesso administrativo"
            >
              <Icon name="lock" className="text-[18px]" />
              <span>Painel Adm</span>
            </Link>
          )}

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}