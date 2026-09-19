import { ImageCaptionCard } from "@/components/ui/ImageCaptionCard";
import { VocationalProfileCard } from "@/components/result/VocationalProfileCard";
import { WINNER_COURSE } from "@/data/result";

export function CourseSnapshot() {
  const { snapshotImage, profile } = WINNER_COURSE;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md pt-space-xs">
      <ImageCaptionCard
        src={snapshotImage.src}
        alt={snapshotImage.alt}
        caption={snapshotImage.caption}
        captionIcon={snapshotImage.icon}
        aspectClassName="h-48 aspect-auto"
        className="lg:col-span-8"
      />
      <VocationalProfileCard {...profile} />
    </div>
  );
}
