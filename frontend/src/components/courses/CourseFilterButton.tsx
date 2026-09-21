import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

export interface CourseFilterButtonProps {
  label: string;
  icon: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function CourseFilterButton({
  label,
  icon,
  count,
  active,
  onClick,
}: CourseFilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-label-md text-label-md transition-all shadow-sm",
        active
          ? "bg-primary-container text-on-primary-container"
          : "bg-surface-track text-text-muted hover:text-text-high-contrast hover:bg-surface-bright"
      )}
    >
      <Icon name={icon} className="text-[18px]" />
      <span>{label}</span>
      <span
        className={cn(
          "ml-1 px-1.5 py-0.5 rounded-full font-label-sm text-label-sm",
          active
            ? "bg-on-primary-container/20 text-on-primary-container"
            : "bg-surface-container-high text-text-muted"
        )}
      >
        {count}
      </span>
    </button>
  );
}
