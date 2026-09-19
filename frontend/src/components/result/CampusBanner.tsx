import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { CAMPUS_BANNER } from "@/data/result";

export function CampusBanner() {
  return (
    <section className="bg-surface-card rounded-xl p-space-lg md:p-space-xl flex flex-col md:flex-row items-center gap-space-lg">
      <div className="w-full md:w-1/3 h-44 rounded-lg overflow-hidden relative bg-surface-track">
        <Image
          src={CAMPUS_BANNER.image.src}
          alt={CAMPUS_BANNER.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-surface-base/30" />
      </div>
      <div className="flex-1 flex flex-col gap-space-xs">
        <div className="inline-flex items-center gap-1 text-primary-container font-label-sm text-label-sm uppercase tracking-wider">
          <Icon name="location_on" className="text-[16px]" />
          {CAMPUS_BANNER.tag}
        </div>
        <h4 className="font-headline-md text-headline-md text-text-high-contrast font-bold">
          {CAMPUS_BANNER.title}
        </h4>
        <p className="font-body-md text-body-md text-text-muted">
          {CAMPUS_BANNER.description}
        </p>
      </div>
    </section>
  );
}
