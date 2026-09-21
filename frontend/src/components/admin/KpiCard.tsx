import { Icon } from "@/components/ui/Icon";

export interface KpiCardProps {
  icon: string;
  label: string;
  children: React.ReactNode;
}

/**
 * Invólucro comum aos 4 cartões de KPI do painel administrativo. O conteúdo
 * central (valor, tendência, tags) varia por cartão e é passado como children.
 */
export function KpiCard({ icon, label, children }: KpiCardProps) {
  return (
    <div className="bg-surface-card p-space-lg rounded-xl flex flex-col gap-space-sm shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted">
          {label}
        </span>
        <div className="w-9 h-9 rounded-lg bg-surface-track flex items-center justify-center text-primary-container">
          <Icon name={icon} className="text-[20px]" />
        </div>
      </div>
      {children}
    </div>
  );
}
