"use client";

import { Icon } from "@/components/ui/Icon";
import { AdminFilterOptions } from "@/types";

export interface StudentFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  schoolId: string;
  onSchoolChange: (value: string) => void;
  gradeId: string;
  onGradeChange: (value: string) => void;
  courseId: string;
  onCourseChange: (value: string) => void;
  onClear: () => void;
  visibleCount: number;
  totalCount: number;
  filterOptions: AdminFilterOptions;
}

export function StudentFilterBar({
  query,
  onQueryChange,
  schoolId,
  onSchoolChange,
  gradeId,
  onGradeChange,
  courseId,
  onCourseChange,
  onClear,
  visibleCount,
  totalCount,
  filterOptions,
}: StudentFilterBarProps) {
  return (
    <section className="bg-surface-card p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-[20px]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar por nome do estudante, escola ou curso recomendado..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-track text-text-high-contrast placeholder-text-muted font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="relative">
            <select
              value={schoolId}
              onChange={(e) => onSchoolChange(e.target.value)}
              className="appearance-none bg-surface-track text-text-high-contrast font-label-md text-label-md pl-3 pr-8 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer max-w-[200px]"
            >
              <option value="">Todas as Escolas</option>
              {filterOptions.schools.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted text-[18px]"
            />
          </div>

          <div className="relative">
            <select
              value={gradeId}
              onChange={(e) => onGradeChange(e.target.value)}
              className="appearance-none bg-surface-track text-text-high-contrast font-label-md text-label-md pl-3 pr-8 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer max-w-[180px]"
            >
              <option value="">Todas as Séries</option>
              {filterOptions.grades.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted text-[18px]"
            />
          </div>

          <div className="relative">
            <select
              value={courseId}
              onChange={(e) => onCourseChange(e.target.value)}
              className="appearance-none bg-surface-track text-text-high-contrast font-label-md text-label-md pl-3 pr-8 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer max-w-[200px]"
            >
              <option value="">Todos os Cursos</option>
              {filterOptions.courses.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted text-[18px]"
            />
          </div>

          <button
            type="button"
            onClick={onClear}
            title="Limpar Filtros"
            className="p-2.5 rounded-lg bg-surface-track hover:bg-surface-bright text-text-muted hover:text-text-high-contrast transition-all"
          >
            <Icon name="filter_alt_off" className="text-[20px]" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-text-muted font-body-sm text-body-sm pt-2">
        <span>
          Exibindo{" "}
          <strong className="text-text-high-contrast">{visibleCount}</strong>{" "}
          de{" "}
          <strong className="text-text-high-contrast">
            {totalCount.toLocaleString("pt-BR")}
          </strong>{" "}
          respostas catalogadas
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-container" />
          <span>Sincronização em tempo real ativa</span>
        </div>
      </div>
    </section>
  );
}
