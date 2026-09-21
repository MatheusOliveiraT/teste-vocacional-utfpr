import { Icon } from "@/components/ui/Icon";
import { AdmissionPathway } from "@/types";

export function AdmissionColumn({ icon, title, description, tag }: AdmissionPathway) {
  return (
    <div className="bg-surface-track rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="w-10 h-10 rounded-lg bg-surface-base flex items-center justify-center text-primary-container mb-space-md">
          <Icon name={icon} className="text-[24px]" />
        </div>
        <h3 className="font-headline-sm text-headline-sm text-text-high-contrast mb-space-xs">
          {title}
        </h3>
        <p className="font-body-sm text-body-sm text-text-muted mb-space-sm">
          {description}
        </p>
      </div>
      <div className="pt-space-sm">
        <span className="inline-flex items-center gap-1 text-primary-container font-label-sm text-label-sm">
          {tag}
          <Icon name="chevron_right" className="text-[16px]" />
        </span>
      </div>
    </div>
  );
}
