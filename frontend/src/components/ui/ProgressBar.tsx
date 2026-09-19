import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  /** Percentual concluído, de 0 a 100 */
  value: number;
  /** Altura da barra */
  size?: "xs" | "sm" | "md";
  /** Adiciona um brilho amarelo na ponta do preenchimento (usado no duelo) */
  glow?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<ProgressBarProps["size"]>, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
};

/**
 * Barra de progresso acessível reutilizada na identificação (progresso da etapa)
 * e no duelo (progresso do questionário, no topo fixo e no rodapé).
 */
export function ProgressBar({
  value,
  size = "md",
  glow = false,
  className,
}: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={cn(
        "w-full bg-surface-track rounded-full overflow-hidden",
        SIZE_CLASSES[size],
        className
      )}
    >
      <div
        className="bg-primary-container h-full rounded-full relative transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      >
        {glow && (
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-brand-yellow-hover blur-[2px]" />
        )}
      </div>
    </div>
  );
}
