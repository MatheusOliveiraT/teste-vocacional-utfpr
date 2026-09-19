"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { MetricChip } from "@/components/result/MetricChip";
import { CourseSnapshot } from "@/components/result/CourseSnapshot";
import { STUDENT_NAME, WINNER_COURSE } from "@/data/result";

export function WinnerCard() {
  return (
    <section className="relative group">
      <div className="relative bg-surface-card rounded-xl p-space-lg md:p-space-xl shadow-xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 p-space-lg opacity-5 pointer-events-none hidden md:block">
          <Icon
            name="school"
            className="text-[160px] text-primary-container leading-none select-none"
          />
        </div>

        <div className="relative z-10 flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-space-md">
            <div className="flex flex-col gap-1">
              <span className="font-label-md text-label-md text-text-muted flex items-center gap-1.5">
                <Icon
                  name="verified"
                  filled
                  className="text-[16px] text-primary-container"
                />
                Parabéns, {STUDENT_NAME}!
              </span>
              <p className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider mt-0.5">
                Seu curso ideal na UTFPR-CM é:
              </p>
            </div>

            <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-container self-start md:self-auto font-label-lg text-label-lg shadow-sm">
              <Icon name="bolt" filled className="text-[18px]" />
              {WINNER_COURSE.compatibility}% de Compatibilidade
            </div>
          </div>

          <div className="flex flex-col gap-space-sm max-w-3xl">
            <div className="flex items-center gap-space-sm flex-wrap">
              <div className="w-10 h-10 rounded-lg bg-surface-track flex items-center justify-center text-primary-container">
                <Icon name={WINNER_COURSE.icon} className="text-[24px]" />
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary-container font-bold tracking-tight">
                {WINNER_COURSE.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded bg-surface-track text-text-high-contrast font-label-sm text-label-sm uppercase">
                {WINNER_COURSE.degreeType}
              </span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface">
              {WINNER_COURSE.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
            {WINNER_COURSE.metrics.map((metric) => (
              <MetricChip key={metric.label} {...metric} />
            ))}
          </div>

          <CourseSnapshot />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md pt-space-sm border-t border-border-subtle/30">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm">
              <Button as="link" href="#" icon="open_in_new">
                Ver Matriz Curricular do Curso
              </Button>
              <Button
                as="button"
                variant="secondary"
                icon="share"
                onClick={() => {
                  if (typeof navigator !== "undefined") {
                    navigator.clipboard
                      ?.writeText(window.location.href)
                      .then(() => alert("Link do resultado copiado com sucesso!"));
                  }
                }}
              >
                Compartilhar Resultado
              </Button>
            </div>
            <a
              href="#"
              className="inline-flex items-center justify-center sm:justify-start gap-1 font-label-md text-label-md text-text-muted hover:text-primary-container transition-colors py-2"
            >
              Como ingressar pelo SiSU &amp; Vestibular UTFPR
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
