// src/components/result/RankingItem.tsx
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface RankingItemProps {
  rank: number;
  name: string;
  percent: number;
  degreeType: string;
  semesters: number;
  topMatch?: boolean;
  curriculumUrl: string;
}

export function RankingItem({
  rank,
  name,
  percent,
  degreeType,
  semesters,
  topMatch,
  curriculumUrl,
}: RankingItemProps) {
  return (
    <div className="bg-surface-card rounded-xl p-space-md flex flex-col gap-space-sm hover:bg-surface-card/90 transition-all">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-space-xs min-w-0">
          <span
            className={cn(
              "font-label-sm text-label-sm font-bold px-2 py-0.5 rounded bg-surface-track",
              topMatch ? "text-primary-container" : "text-text-muted"
            )}
          >
            #{rank}
          </span>
          <h4 className="font-headline-sm text-headline-sm text-text-high-contrast truncate">
            {name}
          </h4>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {topMatch && (
            <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
              Top Match
            </span>
          )}
          <span
            className={cn(
              "font-label-lg text-label-lg font-bold",
              topMatch ? "text-primary-container" : "text-text-muted font-semibold"
            )}
          >
            {percent}%
          </span>
        </div>
      </div>

      <div className="w-full h-2.5 bg-surface-track rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            topMatch ? "bg-primary-container" : "bg-text-muted/20"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-text-muted font-label-sm text-label-sm pt-0.5">
        <span>
          {degreeType} • {semesters} semestres
        </span>
        <a
          href={curriculumUrl}
          className={cn(
            "inline-flex items-center gap-0.5",
            topMatch
              ? "text-primary-container hover:underline"
              : "hover:text-text-high-contrast"
          )}
        >
          Ver detalhes <Icon name="chevron_right" className="text-[14px]" />
        </a>
      </div>
    </div>
  );
}