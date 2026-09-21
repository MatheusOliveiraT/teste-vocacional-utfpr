"use client";

import { Icon } from "@/components/ui/Icon";

export interface AdminHeaderProps {
  onNewResponse: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function AdminHeader({
  onNewResponse,
  onRefresh,
  isRefreshing,
}: AdminHeaderProps) {
  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-track text-text-muted font-label-sm text-label-sm uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            UTFPR-CM • Acesso Restrito
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-card text-primary-container font-label-sm text-label-sm">
            PAINEL DE CONTROLE ADMINISTRATIVO
          </span>
        </div>
        <div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
          <Icon name="calendar_today" className="text-[18px]" />
          <span>Ano Letivo 2025 • Ingresso 1º e 2º Semestres</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="flex flex-col gap-1 max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg text-text-high-contrast tracking-tight">
            Gestão de Respostas do Teste Vocacional
          </h1>
          <p className="font-body-md text-body-md text-text-muted">
            Monitore o engajamento dos estudantes, exporte relatórios
            consolidados e gerencie dados para orientar futuras turmas dos
            cursos de graduação da UTFPR Câmpus Campo Mourão.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-card hover:bg-surface-track text-text-high-contrast font-label-md text-label-md transition-all shadow-sm disabled:opacity-60"
          >
            <Icon
              name="refresh"
              className={`text-[18px] text-text-muted ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span>{isRefreshing ? "Atualizando..." : "Atualizar Dados"}</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-card hover:bg-surface-track text-text-high-contrast font-label-md text-label-md transition-all shadow-sm"
          >
            <Icon name="download" className="text-[18px] text-text-muted" />
            <span>Exportar CSV</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-card hover:bg-surface-track text-text-high-contrast font-label-md text-label-md transition-all shadow-sm"
          >
            <Icon
              name="picture_as_pdf"
              className="text-[18px] text-text-muted"
            />
            <span>Relatório PDF</span>
          </button>
          <button
            type="button"
            onClick={onNewResponse}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md hover:bg-brand-yellow-hover active:scale-[0.98] transition-all shadow-md"
          >
            <Icon name="add" className="text-[20px]" />
            <span>Nova Resposta Manual</span>
          </button>
        </div>
      </div>
    </header>
  );
}
