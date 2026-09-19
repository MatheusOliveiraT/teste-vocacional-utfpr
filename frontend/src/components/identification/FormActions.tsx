import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export interface FormActionsProps {
  backHref: string;
  backLabel: string;
  submitLabel: string;
  loadingLabel?: string;
  isSubmitting?: boolean;
}

export function FormActions({
  backHref,
  backLabel,
  submitLabel,
  loadingLabel = "Carregando...",
  isSubmitting = false,
}: FormActionsProps) {
  return (
    <div
      className="flex flex-col-reverse sm:flex-row items-center justify-between gap-space-md mt-4 pt-space-lg"
      style={{ borderTop: "1px solid rgba(48, 54, 61, 0.6)" }}
    >
      <Link
        href={backHref}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg font-label-md text-label-md text-text-muted hover:text-text-high-contrast hover:bg-surface-track transition-all focus:outline-none"
      >
        <Icon name="arrow_back" className="text-[16px]" />
        <span>{backLabel}</span>
      </Link>

      <Button
        as="button"
        type="submit"
        icon="arrow_forward"
        disabled={isSubmitting}
        fullWidthOnMobile
        className="font-bold group"
      >
        {isSubmitting ? loadingLabel : submitLabel}
      </Button>
    </div>
  );
}
