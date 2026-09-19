import { ProgressBar } from "@/components/ui/ProgressBar";

export function DuelTopProgress({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-surface-track h-1 relative overflow-hidden">
      <ProgressBar
        value={percent}
        size="xs"
        glow
        className="rounded-none bg-transparent"
      />
    </div>
  );
}
