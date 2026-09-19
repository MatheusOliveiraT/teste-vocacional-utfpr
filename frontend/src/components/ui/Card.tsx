import { cn } from "@/lib/utils";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Renderiza como <section> em vez de <div>, útil semanticamente */
  as?: "div" | "section";
  style?: React.CSSProperties;
}

/**
 * Superfície elevada (bg-surface-card + borda sutil) reutilizada como base
 * de praticamente todos os "cartões" do produto (hero, formulário, ranking, etc.)
 */
export function Card({ children, className, as = "div", style }: CardProps) {
  const Component = as;
  return (
    <Component
      style={style}
      className={cn(
        "bg-surface-card border border-border-subtle rounded-xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
