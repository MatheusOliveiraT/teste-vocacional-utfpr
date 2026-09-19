import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface MetricChipProps {
  icon: string;
  label: string;
  value: string;
  valueIcon?: string;
  highlight?: boolean;
}

export function MetricChip({
  icon,
  label,
  value,
  valueIcon,
  highlight,
}: MetricChipProps) {
  return (
    <div className="bg-surface-track/80 rounded-lg p-space-md flex flex-col gap-1">
      <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider flex items-center gap-1">
        <Icon name={icon} className="text-[14px] text-primary-container" />
        {label}
      </span>
      <span
        className={cn(
          "font-label-lg text-label-lg font-semibold flex items-center gap-1",
          highlight ? "text-primary-container" : "text-text-high-contrast"
        )}
      >
        {value}
        {valueIcon && <Icon name={valueIcon} className="text-[16px]" />}
      </span>
    </div>
  );
}
