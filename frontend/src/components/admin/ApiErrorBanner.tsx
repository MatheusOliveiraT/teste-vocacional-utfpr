import { Icon } from "@/components/ui/Icon";

export function ApiErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-space-sm bg-error-container/15 border border-status-error/40 text-status-error rounded-lg px-4 py-3">
      <span className="inline-flex items-center gap-2 font-body-sm text-body-sm">
        <Icon name="error" className="text-[18px]" />
        {message}
      </span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded hover:bg-status-error/10"
        >
          <Icon name="close" className="text-[16px]" />
        </button>
      )}
    </div>
  );
}
