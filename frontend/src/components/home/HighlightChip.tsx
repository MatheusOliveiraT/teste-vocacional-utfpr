import { Icon } from "@/components/ui/Icon";
import { Highlight } from "@/types";

export function HighlightChip({ icon, title, subtitle }: Highlight) {
  return (
    <div className="bg-surface-dim border border-border-subtle rounded-lg p-space-md flex flex-col justify-between hover:border-text-muted/40 transition-colors">
      <div className="w-9 h-9 rounded-lg bg-surface-track flex items-center justify-center mb-3">
        <Icon name={icon} className="text-primary-container text-[20px]" />
      </div>
      <div>
        <div className="font-label-md text-label-md text-text-high-contrast font-semibold">
          {title}
        </div>
        <div className="font-body-sm text-body-sm text-text-muted text-[13px] leading-snug mt-0.5">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
