import { Icon } from "@/components/ui/Icon";

export interface VocationalProfileCardProps {
  label: string;
  title: string;
  description: string;
  tag: string;
}

export function VocationalProfileCard({
  label,
  title,
  description,
  tag,
}: VocationalProfileCardProps) {
  return (
    <div className="lg:col-span-4 bg-surface-track rounded-lg p-space-md flex flex-col justify-between">
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
          {label}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-headline-md text-headline-md text-text-high-contrast font-bold">
            {title}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-text-muted">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2 pt-2 text-primary-container font-label-sm text-label-sm">
        <Icon name="psychology" className="text-[16px]" />
        <span>{tag}</span>
      </div>
    </div>
  );
}
