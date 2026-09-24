import { Icon } from "@/components/ui/Icon";
import { BreakdownItem } from "@/types";

export interface BreakdownPanelProps {
  icon: string;
  title: string;
  badge: string;
  items: BreakdownItem[];
  footnoteLeft: string;
  footnoteRight: string;
}

/**
 * Painel com título, badge e uma lista de barras de progresso rotuladas.
 * Reutilizado para "Respostas por Escola" e "Top Cursos de Maior Afinidade".
 */
export function BreakdownPanel({
  icon,
  title,
  badge,
  items,
  footnoteLeft,
  footnoteRight,
}: BreakdownPanelProps) {
  return (
    <div className="bg-surface-card p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={icon} className="text-primary-container text-[22px]" />
          <h2 className="font-headline-sm text-headline-sm text-text-high-contrast">
            {title}
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-track font-label-sm text-label-sm text-text-muted">
          {badge}
        </span>
      </div>

      <div className="flex flex-col gap-3.5 my-1">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center font-body-sm text-body-sm gap-2">
              <span className="text-text-high-contrast font-medium truncate">
                {item.label}
              </span>
              <span
                className={
                  item.emphasized
                    ? "text-primary-container font-semibold shrink-0"
                    : "text-text-muted shrink-0"
                }
              >
                {item.value}
              </span>
            </div>
	<div className="w-full h-2 rounded-full bg-surface-track overflow-hidden">
	  <div
	    className={`h-full rounded-full transition-all duration-500 ${
	      item.barColorClass || (item.emphasized ? "bg-primary-container" : "bg-primary-container/60")
	    }`}
	    style={{ width: `${Math.max(item.percent ?? 0, 2)}%` }}
	  />
	</div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-between text-text-muted font-body-sm text-[13px]">
        <span>{footnoteLeft}</span>
        <span className="text-primary-container font-medium">
          {footnoteRight}
        </span>
      </div>
    </div>
  );
}
