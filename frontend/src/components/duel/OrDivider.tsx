import { cn } from "@/lib/utils";

export interface OrDividerProps {
  /** "floating": centralizado sobre o grid (desktop). "inline": entre os cards empilhados (mobile). */
  variant: "floating" | "inline";
}

export function OrDivider({ variant }: OrDividerProps) {
  if (variant === "floating") {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex items-center justify-center">
        <div className="w-11 h-11 rounded-full bg-surface-base border-2 border-border-subtle flex items-center justify-center shadow-2xl">
          <span className="font-label-sm text-label-sm text-text-muted">OU</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:hidden items-center justify-center my-[-8px] z-10">
      <div
        className={cn(
          "w-8 h-8 rounded-full bg-surface-base border border-border-subtle flex items-center justify-center"
        )}
      >
        <span className="font-label-sm text-label-sm text-text-muted">OU</span>
      </div>
    </div>
  );
}
