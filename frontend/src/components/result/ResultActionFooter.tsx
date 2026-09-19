"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function ResultActionFooter() {
  return (
    <section className="flex flex-col items-center gap-space-lg pt-space-xs pb-space-lg">
      <div className="flex flex-wrap items-center justify-center gap-space-sm w-full">
        <Button as="link" href="/identificacao" variant="ghost" icon="restart_alt" iconPosition="left">
          Refazer o Teste
        </Button>
        <Button as="link" href="#" icon="account_balance" iconPosition="left">
          Conhecer o Câmpus Campo Mourão
        </Button>
        <Button
          as="button"
          variant="ghost"
          icon="download"
          iconPosition="left"
          onClick={() => window.print()}
        >
          Baixar Relatório em PDF
        </Button>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-track text-text-muted font-label-sm text-label-sm text-center">
        <Icon name="verified_user" className="text-[16px] text-primary-container" />
        <span>Graduação Pública, Gratuita e Federal • UTFPR Câmpus Campo Mourão</span>
      </div>
    </section>
  );
}
