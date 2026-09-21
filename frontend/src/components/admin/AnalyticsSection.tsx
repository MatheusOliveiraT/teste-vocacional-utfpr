import { BreakdownPanel } from "@/components/admin/BreakdownPanel";
import { BreakdownItem } from "@/types";

export interface AnalyticsSectionProps {
  schoolBreakdown: BreakdownItem[];
  courseAffinityBreakdown: BreakdownItem[];
}

export function AnalyticsSection({
  schoolBreakdown,
  courseAffinityBreakdown,
}: AnalyticsSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
      <BreakdownPanel
        icon="location_city"
        title="Respostas por Escola / Colégio"
        badge="Top 5"
        items={schoolBreakdown}
        footnoteLeft="Mapeamento contínuo da rede escolar"
        footnoteRight="Ver dados completos →"
      />
      <BreakdownPanel
        icon="workspace_premium"
        title="Top Cursos de Maior Afinidade"
        badge="Graduações UTFPR-CM"
        items={courseAffinityBreakdown}
        footnoteLeft="Algoritmo de pareamento UTFPR ponderado"
        footnoteRight="Total: 9 Cursos Ofertados"
      />
    </section>
  );
}
