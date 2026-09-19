import { ProgressBar } from "@/components/ui/ProgressBar";

export interface StepProgressHeaderProps {
  stepLabel: string;
  percent: number;
}

/**
 * Cabeçalho de progresso reutilizável para fluxos de múltiplas etapas
 * (usado na identificação do estudante; a mesma estrutura de barra também
 * é usada no rodapé do duelo através do componente ProgressBar).
 */
export function StepProgressHeader({
  stepLabel,
  percent,
}: StepProgressHeaderProps) {
  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-space-xs px-2.5 py-1 rounded bg-surface-track text-primary-container">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            {stepLabel}
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-text-muted">
          {percent}% concluído
        </span>
      </div>
      <ProgressBar value={percent} />
    </div>
  );
}
