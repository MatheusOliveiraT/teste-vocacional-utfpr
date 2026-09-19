import { Icon } from "@/components/ui/Icon";

export function PrivacyNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-track/70 mt-1">
      <Icon name="lock" className="text-text-muted text-[18px] mt-0.5 shrink-0" />
      <p className="font-body-sm text-body-sm text-text-muted leading-snug">
        {children}
      </p>
    </div>
  );
}
