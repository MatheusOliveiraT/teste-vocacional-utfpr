import { HeroCard } from "@/components/home/HeroCard";
import { CampusGallery } from "@/components/home/CampusGallery";
import { CourseDirectory } from "@/components/home/CourseDirectory";
import { MethodologyBanner } from "@/components/home/MethodologyBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full py-space-2xl px-margin md:px-margin-desktop overflow-hidden flex flex-col items-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <HeroCard />
        <CampusGallery />
        <CourseDirectory />
        <MethodologyBanner />
      </section>
    </div>
  );
}
