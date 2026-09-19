import { ImageCaptionCard } from "@/components/ui/ImageCaptionCard";
import { CAMPUS_IMAGES } from "@/data/home";

export function CampusGallery() {
  return (
    <div className="w-full max-w-[740px] mt-space-xl grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      {CAMPUS_IMAGES.map((image) => (
        <ImageCaptionCard
          key={image.caption}
          src={image.src}
          alt={image.alt}
          caption={image.caption}
          badgeText={image.badge}
        />
      ))}
    </div>
  );
}
