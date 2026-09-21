import { Icon } from "@/components/ui/Icon";

export interface TablePaginationProps {
  totalCount: number;
  selectedCount: number;
  onSelectAll: () => void;
  onExportSelected: () => void;
  onDeleteSelected: () => void;
}

export function TablePagination({
  totalCount,
  selectedCount,
  onSelectAll,
  onExportSelected,
  onDeleteSelected,
}: TablePaginationProps) {
  return (
    <div className="p-space-md bg-surface-card flex flex-col sm:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-sm flex-wrap">
        <button
          type="button"
          onClick={onSelectAll}
          className="px-3 py-1.5 rounded-lg bg-surface-track hover:bg-surface-bright text-text-muted hover:text-text-high-contrast font-label-md text-label-md transition-colors"
        >
          Selecionar todos ({totalCount.toLocaleString("pt-BR")})
        </button>
        <button
          type="button"
          disabled={selectedCount === 0}
          onClick={onExportSelected}
          className="px-3 py-1.5 rounded-lg bg-surface-track hover:bg-surface-bright text-text-muted hover:text-text-high-contrast font-label-md text-label-md transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          Exportar selecionados
        </button>
        <button
          type="button"
          disabled={selectedCount === 0}
          onClick={onDeleteSelected}
          className="px-3 py-1.5 rounded-lg bg-surface-track hover:bg-error-container text-text-muted hover:text-error font-label-md text-label-md transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          Excluir selecionados
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-text-muted font-body-sm text-body-sm mr-2">
          Página <strong>1</strong> de <strong>125</strong>
        </span>
        <button
          type="button"
          disabled
          className="p-1.5 rounded-lg bg-surface-track text-text-muted hover:text-text-high-contrast disabled:opacity-40 transition-colors"
        >
          <Icon name="chevron_left" className="text-[18px]" />
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold"
        >
          1
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-surface-track hover:bg-surface-bright text-text-high-contrast font-label-md text-label-md transition-colors"
        >
          2
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-surface-track hover:bg-surface-bright text-text-high-contrast font-label-md text-label-md transition-colors"
        >
          3
        </button>
        <span className="text-text-muted px-1">...</span>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-surface-track hover:bg-surface-bright text-text-high-contrast font-label-md text-label-md transition-colors"
        >
          125
        </button>
        <button
          type="button"
          className="p-1.5 rounded-lg bg-surface-track text-text-muted hover:text-text-high-contrast transition-colors"
        >
          <Icon name="chevron_right" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
