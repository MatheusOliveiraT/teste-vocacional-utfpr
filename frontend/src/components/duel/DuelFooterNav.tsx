import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";

export interface DuelFooterNavProps {
  percent: number;
  index: number;
  total: number;
  onPrev: () => void;
  canGoPrev: boolean;
}

export function DuelFooterNav({
  percent,
  index,
  total,
  onPrev,
  canGoPrev,
}: DuelFooterNavProps) {
  return (
    <footer className="max-w-4xl w-full mx-auto pt-6 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        title="Voltar para pergunta anterior"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md text-text-muted hover:text-text-high-contrast bg-transparent hover:bg-surface-card border border-transparent hover:border-border-subtle transition-all duration-200 focus:outline-none focus:border-border-subtle disabled:opacity-30 disabled:pointer-events-none"
      >
        <Icon name="arrow_back" className="text-base" />
        <span>Anterior</span>
      </button>

      <div className="flex items-center gap-3">
        <ProgressBar value={percent} size="sm" className="w-24" />
        <span className="font-label-sm text-label-sm text-text-muted tracking-tight">
          <strong className="text-text-high-contrast font-semibold">
            {Math.round(percent)}%
          </strong>{" "}
          concluído • {index} de {total} duelos
        </span>
      </div>

      <div className="text-right hidden sm:block">
        <span className="font-label-sm text-label-sm text-text-muted">
          Dica: use{" "}
          <kbd className="px-1 py-0.5 bg-surface-track rounded border border-border-subtle text-text-high-contrast font-mono text-[11px]">
            ←
          </kbd>{" "}
          e{" "}
          <kbd className="px-1 py-0.5 bg-surface-track rounded border border-border-subtle text-text-high-contrast font-mono text-[11px]">
            →
          </kbd>{" "}
          para navegar
        </span>
      </div>
    </footer>
  );
}
