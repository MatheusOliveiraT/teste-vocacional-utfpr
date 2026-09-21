import { Icon } from "@/components/ui/Icon";
import { KpiCard } from "@/components/admin/KpiCard";
import { AdminKpis } from "@/types";

export function KpiGrid({ kpis }: { kpis: AdminKpis }) {
  const { totalResponses, schoolsMapped, topCourse, completionRate } = kpis;

  return (
    <section
      aria-label="Métricas Principais"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md"
    >
      <KpiCard icon="how_to_reg" label="Total de Respostas">
        <div className="flex items-baseline gap-2">
          <span className="font-headline-lg text-headline-lg text-text-high-contrast font-bold tracking-tight">
            {totalResponses.value}
          </span>
          <span className="inline-flex items-center text-xs font-semibold text-primary-container">
            <Icon name="trending_up" className="text-[14px]" />
            {totalResponses.trend}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-text-muted">
          Volume acumulado nos últimos 30 dias
        </p>
      </KpiCard>

      <KpiCard icon="domain" label="Escolas Mapeadas">
        <div className="flex items-baseline gap-2">
          <span className="font-headline-lg text-headline-lg text-text-high-contrast font-bold tracking-tight">
            {schoolsMapped.value}
          </span>
          <span className="font-body-sm text-body-sm text-text-muted">
            {schoolsMapped.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block px-2 py-0.5 rounded bg-surface-track font-label-sm text-[11px] text-text-high-contrast">
            Públicas &amp; Privadas
          </span>
          <span className="font-body-sm text-body-sm text-text-muted text-[12px]">
            Campo Mourão &amp; COMCAM
          </span>
        </div>
      </KpiCard>

      <KpiCard icon="school" label="Curso Mais Indicado">
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-text-high-contrast truncate font-semibold">
            {topCourse.name}
          </span>
          <span className="font-body-sm text-body-sm text-primary-container font-medium">
            {topCourse.share}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-text-muted">
          {topCourse.runnerUp}
        </p>
      </KpiCard>

      <KpiCard icon="checklist_rtl" label="Taxa de Conclusão">
        <div className="flex items-baseline gap-2">
          <span className="font-headline-lg text-headline-lg text-text-high-contrast font-bold tracking-tight">
            {completionRate.value}
          </span>
          <span className="font-body-sm text-body-sm text-text-muted">
            efetiva
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-text-muted">
          Média de {completionRate.avgDuels} duelos completados por aluno
        </p>
      </KpiCard>
    </section>
  );
}
