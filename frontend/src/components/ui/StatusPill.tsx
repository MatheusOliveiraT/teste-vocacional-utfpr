import { cn } from "@/lib/utils";

export interface StatusPillProps {
  children: React.ReactNode;
  /** "pulse": ponto com animação simples. "ping": ponto com animação de expansão (usado no resultado). */
  animation?: "pulse" | "ping";
  className?: string;
}

/**
 * Badge de status usado no topo das seções (ex: "Descubra seu futuro",
 * "Duelo 12 de 36", "Seu resultado está pronto!"). Reaproveitado nas 4 telas.
 */
export function StatusPill({
  children,
  animation = "pulse",
  className,
}: StatusPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/25",
        className
      )}
    >
      {animation === "ping" ? (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container" />
        </span>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
      )}
      <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-semibold">
        {children}
      </span>
    </div>
  );
}
