import { Icon } from "@/components/ui/Icon";

export function DuelContextStrip({ label }: { label: string }) {
  return (
    <div className="max-w-4xl w-full mx-auto mb-2 flex items-center justify-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-border-subtle/60 text-text-muted font-label-sm text-label-sm">
        <Icon name="school" className="text-sm text-primary-container" />
        <span>{label}</span>
      </div>
    </div>
  );
}
