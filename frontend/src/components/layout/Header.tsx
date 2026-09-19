"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { NAV_LINKS, VESTIBULAR_LINK } from "@/data/navigation";

/**
 * Cabeçalho fixo com logo, navegação principal, atalho para Vestibular & SISU
 * e avatar do usuário. Reutilizado em todas as telas do fluxo do teste.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-base/95 backdrop-blur-md border-b border-border-subtle">
      <div className="h-16 max-w-[1140px] mx-auto px-gutter-desktop flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <Link
            href="/"
            className="flex items-center gap-space-sm group focus:outline-none"
          >
            <div className="h-8 w-8 rounded bg-primary-container flex items-center justify-center shrink-0">
              <span className="font-headline-sm text-[13px] font-bold text-on-primary-container">
                UTF
              </span>
            </div>
            <span className="hidden sm:inline-block font-headline-sm text-headline-sm text-text-high-contrast tracking-tight">
              Teste Vocacional
            </span>
          </Link>
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded bg-surface-track border border-border-subtle font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
            Câmpus Campo Mourão
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-space-lg">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "font-label-lg text-label-lg transition-colors",
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

        <div className="flex items-center gap-space-md">
          <Link
            href={VESTIBULAR_LINK.href}
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-border-subtle bg-surface-track text-text-high-contrast hover:border-primary-container hover:text-primary-container font-label-md text-label-md transition-all"
          >
            {VESTIBULAR_LINK.label}
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
