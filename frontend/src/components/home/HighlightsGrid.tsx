import { HighlightChip } from "@/components/home/HighlightChip";
import { HERO_HIGHLIGHTS } from "@/data/home";

export function HighlightsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm text-left mb-2">
      {HERO_HIGHLIGHTS.map((highlight) => (
        <HighlightChip key={highlight.title} {...highlight} />
      ))}
    </div>
  );
}
