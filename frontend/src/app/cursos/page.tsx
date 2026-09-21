import { CoursesHero } from "@/components/courses/CoursesHero";
import { CoursesCatalog } from "@/components/courses/CoursesCatalog";
import { AdmissionBanner } from "@/components/courses/AdmissionBanner";

export const metadata = {
  title: "Cursos de Graduação — UTFPR Câmpus Campo Mourão",
};

export default function CoursesPage() {
  return (
    <div className="flex flex-col w-full">
      <CoursesHero />
      <section className="w-full bg-surface-base pb-space-2xl -mt-space-xl">
        <div className="max-w-[1140px] mx-auto px-gutter-desktop flex flex-col gap-space-lg">
          <CoursesCatalog />
        </div>
      </section>
      <AdmissionBanner />
    </div>
  );
}
