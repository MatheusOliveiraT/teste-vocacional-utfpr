"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { DuelOption } from "@/types";

export interface DuelOptionCardProps {
  option: DuelOption;
  label: "Opção A" | "Opção B";
  state: "idle" | "selected" | "dimmed";
  onSelect: () => void;
}

/**
 * Cartão de uma das duas alternativas do duelo. Reutilizado para a Opção A
 * e a Opção B, com estados visuais de "selecionado" e "esmaecido".
 */
export function DuelOptionCard({
  option,
  label,
  state,
  onSelect,
}: DuelOptionCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${option.label || option.text}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "group relative flex flex-col justify-between p-8 rounded-xl bg-surface-card border-2 transition-all duration-300 text-left cursor-pointer min-h-[260px] focus:outline-none focus:ring-1 focus:ring-primary-container",
        state === "selected" &&
          "border-primary-container shadow-[0_0_35px_rgba(255,199,9,0.25)]",
        state === "dimmed" && "opacity-40 scale-[0.98] border-border-subtle",
        state === "idle" &&
          "border-border-subtle hover:border-primary-container hover:shadow-[0_0_28px_rgba(255,199,9,0.14)] hover:-translate-y-1 focus:border-primary-container"
      )}
    >
      <div
        className={cn(
          "absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all",
          state === "selected"
            ? "bg-primary-container border-primary-container"
            : "bg-surface-track border-border-subtle group-hover:border-primary-container/60"
        )}
      >
        <Icon
          name="check"
          className={cn(
            "text-surface-base text-base font-bold transition-opacity",
            state === "selected" ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div className="flex items-center justify-between pr-8">
        <span
          className={cn(
            "px-3 py-1 font-label-sm text-label-sm uppercase rounded-md transition-colors duration-200",
            state === "selected"
              ? "bg-primary-container text-surface-base"
              : "bg-surface-track text-text-muted group-hover:bg-primary-container group-hover:text-surface-base"
          )}
        >
          {label}
        </span>
        <Icon
          name={option.icon}
          className="text-text-muted group-hover:text-primary-container text-2xl transition-colors duration-200"
        />
      </div>

      <div className="my-6">
      <p className="font-headline-md text-headline-md text-text-high-contrast leading-snug">
        {option.label || option.text}
      </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50">
        <span className="font-label-sm text-label-sm text-text-muted flex items-center gap-1.5 group-hover:text-primary-container transition-colors">
        <kbd className="px-1.5 py-0.5 rounded bg-surface-track border border-border-subtle font-label-sm text-text-high-contrast">
          {option.key || (label === "Opção A" ? "A" : "B")}
        </kbd>
          <span>ou clique para selecionar</span>
        </span>
        <Icon
          name="arrow_forward"
          className="text-text-muted text-base group-hover:translate-x-1 group-hover:text-primary-container transition-all duration-200"
        />
      </div>
    </div>
  );
}
