import { CoursePill } from "@/components/home/CoursePill";
import { EVALUATED_COURSES } from "@/data/home";

export function CourseDirectory() {
  return (
    <div className="w-full max-w-[820px] mt-space-2xl text-center">
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="h-px w-6 bg-border-subtle" />
        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest font-semibold">
          Cursos Avaliados no Teste
        </span>
        <span className="h-px w-6 bg-border-subtle" />
      </div>
      <p className="font-body-sm text-body-sm text-text-muted max-w-lg mx-auto mb-6">
        Todas as 10 graduações do câmpus são públicas, gratuitas e com padrão
        de excelência federal.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {EVALUATED_COURSES.map((course) => (
          <CoursePill key={course} label={course} />
        ))}
      </div>
    </div>
  );
}
