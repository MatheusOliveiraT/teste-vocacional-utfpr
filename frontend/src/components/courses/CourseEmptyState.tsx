import { Icon } from "@/components/ui/Icon";

export function CourseEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-space-2xl bg-surface-card rounded-xl text-center shadow-sm">
      <Icon
        name="search_off"
        className="text-[48px] text-text-muted mb-space-sm"
      />
      <h3 className="font-headline-sm text-headline-sm text-text-high-contrast mb-1">
        Nenhum curso encontrado
      </h3>
      <p className="font-body-md text-body-md text-text-muted max-w-md mb-space-md">
        Tente buscar por termos mais genéricos como &quot;computação&quot;,
        &quot;engenharia&quot;, &quot;noturno&quot; ou &quot;química&quot;.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="px-4 py-2 rounded-lg bg-surface-track text-text-high-contrast hover:bg-surface-bright font-label-md text-label-md transition-colors"
      >
        Limpar Filtros e Busca
      </button>
    </div>
  );
}
