import { cn } from "@/lib/utils";

export interface IconProps {
  /** Nome do ícone do Material Symbols (ex: "school", "arrow_forward") */
  name: string;
  className?: string;
  /** Usa a variação preenchida (FILL 1) do símbolo */
  filled?: boolean;
}

/**
 * Wrapper reutilizável para ícones do Google Material Symbols.
 * Usado em toda a aplicação no lugar de repetir a mesma <span> com classes.
 */
export function Icon({ name, className, filled }: IconProps) {
  return (
    <span
      className={cn("material-symbols-outlined leading-none", className)}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
