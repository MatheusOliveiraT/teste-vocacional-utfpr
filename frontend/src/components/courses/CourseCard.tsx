import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { CourseCatalogItem } from "@/types";

export function CourseCard({ course }: { course: CourseCatalogItem }) {
  return (
    <article className="group relative bg-surface-card rounded-xl overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-surface-track">
          <Image
            src={course.image}
            alt={course.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/30 to-transparent" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-surface-base/90 backdrop-blur-sm text-primary-container font-label-sm text-label-sm uppercase">
              {course.degreeType}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-base/90 backdrop-blur-sm text-text-high-contrast font-label-sm text-label-sm">
              {course.vagas}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
              <Icon name="schedule" className="text-[16px]" />
              {course.duration}
            </span>
            {course.turno && (
              <>
                <span className="text-text-muted">•</span>
                <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <Icon name="wb_sunny" className="text-[16px]" />
                  {course.turno}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="p-space-lg">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="font-headline-sm text-headline-sm text-text-high-contrast group-hover:text-primary-container transition-colors">
              {course.title}
            </h2>
            <Icon
              name={course.icon}
              className="text-primary-container text-[22px] shrink-0"
            />
          </div>
          <p className="font-body-sm text-body-sm text-text-muted mb-space-md line-clamp-3">
            {course.description}
          </p>
          <div className="mb-space-md">
            <p className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider mb-2">
              Principais Focos:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {course.focusTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-surface-track text-text-high-contrast font-label-sm text-label-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-space-lg pt-0 flex items-center gap-2">
        {course.primaryAction === "matriz" && course.matrixUrl ? (
          <a
            href={course.matrixUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-lg bg-surface-track hover:bg-surface-bright text-text-high-contrast font-label-md text-label-md transition-colors text-center"
          >
            Matriz Curricular
          </a>
        ) : (
          <span className="flex-1 py-2.5 px-3 rounded-lg bg-surface-track text-text-high-contrast font-label-md text-label-md text-center">
            Mercado de Trabalho
          </span>
        )}
        <a
          href="/identificacao"
          className="flex-1 py-2.5 px-3 rounded-lg bg-primary-container hover:bg-brand-yellow-hover text-on-primary-container font-label-md text-label-md transition-colors text-center"
        >
          Ver Afinidade
        </a>
      </div>
    </article>
  );
}
