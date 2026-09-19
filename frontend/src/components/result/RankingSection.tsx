import { Icon } from "@/components/ui/Icon";
import { RankingItem } from "@/components/result/RankingItem";
import { RANKED_COURSES } from "@/data/result";

export function RankingSection() {
  return (
    <section className="flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm pb-space-xs">
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            Panorama Geral de Aderência
          </span>
          <h3 className="font-headline-lg text-headline-lg text-text-high-contrast tracking-tight">
            Sua compatibilidade com os 10 Cursos da UTFPR-CM
          </h3>
          <p className="font-body-md text-body-md text-text-muted">
            Classificação completa das graduações por índice de aderência ao
            seu perfil de interesses.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface-card px-3 py-1.5 rounded-lg text-text-muted font-label-sm text-label-sm self-start md:self-auto">
          <Icon name="info" className="text-[16px] text-primary-container" />
          Atualizado com diretrizes acadêmicas UTFPR
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
        {RANKED_COURSES.map((course) => (
          <RankingItem key={course.rank} {...course} />
        ))}
      </div>
    </section>
  );
}
