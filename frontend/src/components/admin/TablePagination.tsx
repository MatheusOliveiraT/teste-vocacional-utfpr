"use client";

import { Icon } from "@/components/ui/Icon";

export interface TablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  selectedCount: number;
  onPageChange: (page: number) => void;
  onSelectAll: () => void;
  onExportSelected: () => void;
  onDeleteSelected: () => void;
}

export function TablePagination({
  currentPage,
  pageSize,
  totalCount,
  selectedCount,
  onPageChange,
  onSelectAll,
  onExportSelected,
  onDeleteSelected,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Gera a lista de páginas a exibir (ex: [1, 2, 3, "...", 10])
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="p-space-md bg-surface-card flex flex-col sm:flex-row items-center justify-between gap-space-md">
      {/* Botões de Ação em Lote */}
      <div className="flex items-center gap-space-sm flex-wrap">
        <button
          type="button"
          onClick={onSelectAll}
          className="px-3 py-1.5 rounded-lg bg-surface-track hover:bg-surface-bright text-text-muted hover:text-text-high-contrast font-label-md text-label-md transition-colors"
        >
          Selecionar visíveis ({totalCount.toLocaleString("pt-BR")})
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

      {/* Controles de Paginação */}
      <div className="flex items-center gap-1.5">
        <span className="text-text-muted font-body-sm text-body-sm mr-2 hidden md:inline">
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </span>

        {/* Botão Anterior */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg bg-surface-track text-text-muted hover:text-text-high-contrast disabled:opacity-40 transition-colors"
          title="Página Anterior"
        >
          <Icon name="chevron_left" className="text-[18px]" />
        </button>

        {/* Lista de Botões de Página */}
        {getPageNumbers().map((page, idx) => {
          if (page === "...") {
            return (
              <span key={`dots-${idx}`} className="text-text-muted px-1">
                ...
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg font-label-md text-label-md font-bold transition-colors ${
                isActive
                  ? "bg-primary-container text-surface-base"
                  : "bg-surface-track hover:bg-surface-bright text-text-high-contrast"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Botão Próximo */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg bg-surface-track text-text-muted hover:text-text-high-contrast disabled:opacity-40 transition-colors"
          title="Próxima Página"
        >
          <Icon name="chevron_right" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
