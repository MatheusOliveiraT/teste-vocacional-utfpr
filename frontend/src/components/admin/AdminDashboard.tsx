"use client";

import { useMemo, useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { KpiGrid } from "@/components/admin/KpiGrid";
import { AnalyticsSection } from "@/components/admin/AnalyticsSection";
import { StudentFilterBar } from "@/components/admin/StudentFilterBar";
import { StudentsTable } from "@/components/admin/StudentsTable";
import { TablePagination } from "@/components/admin/TablePagination";
import {
  StudentModal,
  ModalMode,
  StudentModalSaveInput,
} from "@/components/admin/StudentModal";
import { ApiErrorBanner } from "@/components/admin/ApiErrorBanner";
import {
  deleteStudentRequest,
  deleteStudentsRequest,
  fetchAdminDashboard,
  saveStudent,
} from "@/lib/api/admin-client";
import { AdminDashboardData, AdminStudent } from "@/types";

const EMPTY_STUDENT: AdminStudent = {
  id: "",
  name: "",
  school: "",
  schoolId: "",
  schoolLevelId: "",
  topMatchCourse: "—",
  topMatchCourseId: "",
};

export interface AdminDashboardProps {
  /** Payload já buscado no servidor (via `getDashboardData`) para o primeiro render. */
  initialData: AdminDashboardData;
}

/**
 * Painel administrativo orientado a dados reais: recebe o snapshot inicial
 * via SSR (`initialData`, montado em `lib/admin-source.ts` a partir de
 * `/api/test/options`, `/api/dashboard/stats` e `/api/test/results`) e, a
 * partir daí, consulta/mutações passam pelas rotas em `app/api/admin/**`
 * através de `lib/api/admin-client.ts`.
 */
export function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [data, setData] = useState<AdminDashboardData>(initialData);
  const [query, setQuery] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<{
    mode: ModalMode;
    student: AdminStudent | null;
  }>({ mode: null, student: null });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Estado para a mensagem temporária de sucesso (Toast)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Timer para limpar a mensagem automaticamente após 4 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  // Estado do modal de confirmação
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: async () => {},
  });
  // 1. Defina o número de itens por página e o estado da página atual
  const PAGE_SIZE = 10; // Exibe 10 alunos por página
  const [currentPage, setCurrentPage] = useState(1);

  // 2. Primeiro declare a lista filtrada (filteredStudents)
  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.students.filter((student) => {
      const matchesQuery =
        !normalizedQuery ||
        [student.name, student.school, student.topMatchCourse]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesSchool = !schoolId || student.schoolId === schoolId;
      const matchesGrade = !gradeId || student.schoolLevelId === gradeId;
      const matchesCourse =
        !courseId || student.topMatchCourseId === courseId;
      return matchesQuery && matchesSchool && matchesGrade && matchesCourse;
    });
  }, [data.students, query, schoolId, gradeId, courseId]);

  // Resetar para a página 1 caso algum filtro (escola, série, busca) mude
  useEffect(() => {
    setCurrentPage(1);
  }, [query, schoolId, gradeId, courseId]);

  // 3. Agora declare a lista paginada consumindo 'filteredStudents' já inicializado
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredStudents.slice(start, start + PAGE_SIZE);
  }, [filteredStudents, currentPage]);

  const allChecked =
    filteredStudents.length > 0 &&
    filteredStudents.every((s) => selectedIds.has(s.id));

  function toggleAll() {
    setSelectedIds((prev) => {
      if (allChecked) return new Set();
      return new Set(filteredStudents.map((s) => s.id));
    });
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleClearFilters() {
    setQuery("");
    setSchoolId("");
    setGradeId("");
    setCourseId("");
  }

  async function handleRefresh() {
    setIsRefreshing(true);
    setError(null);
    try {
      const fresh = await fetchAdminDashboard();
      setData(fresh);
      setSelectedIds(new Set());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível atualizar os dados do painel."
      );
    } finally {
      setIsRefreshing(false);
    }
  }

  // Execução real da exclusão individual
  async function executeDeleteOne(id: string) {
    const previousStudents = data.students;
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id),
    }));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

    try {
      await deleteStudentRequest(id);
      setSuccessMessage("Registro excluído com sucesso!");
    } catch (err) {
      setData((prev) => ({ ...prev, students: previousStudents }));
      setError(
        err instanceof Error ? err.message : "Falha ao excluir o registro."
      );
    }
  }

  // Handler do botão de exclusão individual (Abre o Modal)
  function handleDeleteOne(id: string) {
    const student = data.students.find((s) => s.id === id);
    const name = student?.fullName ? `"${student.fullName}"` : "este registro";

    setConfirmModal({
      isOpen: true,
      title: "Excluir Registro",
      message: `Tem certeza que deseja excluir ${name}? Esta ação não poderá ser desfeita.`,
      onConfirm: async () => {
        await executeDeleteOne(id);
      },
    });
  }

  // Execução real da exclusão em massa
  async function executeDeleteSelected() {
    const idsToDelete = Array.from(selectedIds);
    if (idsToDelete.length === 0) return;
    const count = idsToDelete.length;
    const previousStudents = data.students;
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => !selectedIds.has(s.id)),
    }));
    setSelectedIds(new Set());
    try {
      await deleteStudentsRequest(idsToDelete);
      setSuccessMessage(
        count > 1
          ? `${count} registros excluídos com sucesso!`
          : "Registro excluído com sucesso!"
      );
    } catch (err) {
      setData((prev) => ({ ...prev, students: previousStudents }));
      setError(
        err instanceof Error
          ? err.message
          : "Falha ao excluir os registros selecionados."
      );
    }
  }

  // Handler do botão de exclusão em massa (Abre o Modal)
  function handleDeleteSelected() {
    const count = selectedIds.size;
    if (count === 0) return;

    setConfirmModal({
      isOpen: true,
      title: "Excluir Registros Selecionados",
      message: `Tem certeza que deseja excluir os ${count} registros selecionados? Esta ação não poderá ser desfeita.`,
      onConfirm: async () => {
        await executeDeleteSelected();
      },
    });
  }

  async function handleSaveModal(updated: StudentModalSaveInput) {
    setIsSaving(true);
    setError(null);
    try {
      const isEditingExisting = Boolean(modal.student?.id);
      const saved = await saveStudent({
        id: isEditingExisting ? modal.student?.id : undefined,
        name: updated.name,
        schoolId: updated.schoolId,
        schoolLevelId: updated.schoolLevelId,
        profileId: updated.profileId,
      });

      setData((prev) => {
        const exists = prev.students.some((s) => s.id === saved.id);
        return {
          ...prev,
          students: exists
            ? prev.students.map((s) => (s.id === saved.id ? saved : s))
            : [saved, ...prev.students],
        };
      });
      setModal({ mode: null, student: null });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao salvar o registro."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-[1140px] w-full mx-auto px-margin md:px-gutter-desktop py-space-xl flex flex-col gap-space-xl text-on-surface">
      <AdminHeader
        onNewResponse={() =>
          setModal({ mode: "edit", student: { ...EMPTY_STUDENT } })
        }
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {error && (
        <ApiErrorBanner message={error} onDismiss={() => setError(null)} />
      )}

      <KpiGrid kpis={data.kpis} />
      <AnalyticsSection
        schoolBreakdown={data.schoolBreakdown}
        courseAffinityBreakdown={data.courseAffinityBreakdown}
      />

      <StudentFilterBar
        query={query}
        onQueryChange={setQuery}
        schoolId={schoolId}
        onSchoolChange={setSchoolId}
        gradeId={gradeId}
        onGradeChange={setGradeId}
        courseId={courseId}
        onCourseChange={setCourseId}
        onClear={handleClearFilters}
        visibleCount={filteredStudents.length}
        totalCount={data.totalResponses}
        filterOptions={data.filterOptions}
      />

	<section className="bg-surface-card rounded-xl shadow-sm overflow-hidden flex flex-col">
	  <StudentsTable
	    students={paginatedStudents} // <--- Passa apenas os alunos da página atual
	    selectedIds={selectedIds}
	    allChecked={allChecked}
	    onToggleAll={toggleAll}
	    onToggleOne={toggleOne}
	    onView={(student) => setModal({ mode: "view", student })}
	    onEdit={(student) => setModal({ mode: "edit", student })}
	    onDelete={handleDeleteOne}
	  />
	  
	  <TablePagination
	    currentPage={currentPage}
	    pageSize={PAGE_SIZE}
	    totalCount={filteredStudents.length}
	    selectedCount={selectedIds.size}
	    onPageChange={setCurrentPage}
	    onSelectAll={toggleAll}
	    onExportSelected={() => {
	      /* Chama a função de exportação */
	    }}
	    onDeleteSelected={handleDeleteSelected}
	  />
	</section>
      <StudentModal
        mode={modal.mode}
        student={modal.student}
        filterOptions={data.filterOptions}
        isSaving={isSaving}
        onClose={() => setModal({ mode: null, student: null })}
        onSave={handleSaveModal}
      />
      {/* Toast / Alerta Flutuante de Sucesso */}
      {successMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shadow-2xl backdrop-blur-md animate-fadeIn">
          <Icon name="check_circle" className="text-xl text-emerald-400" />
          <span className="font-label-md font-semibold">{successMessage}</span>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="ml-2 text-emerald-400/60 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <Icon name="close" className="text-lg" />
          </button>
        </div>
      )}
      {/* Modal de Confirmação de Exclusão */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-card border border-border-subtle rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3 text-status-error">
              <div className="w-10 h-10 rounded-full bg-status-error/10 flex items-center justify-center shrink-0">
                <Icon name="warning" className="text-2xl text-status-error" />
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-text-high-contrast">
                {confirmModal.title}
              </h3>
            </div>

            <p className="font-body-md text-text-muted">
              {confirmModal.message}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-xl border border-border-subtle bg-surface-track hover:bg-surface-bright text-text-high-contrast font-label-md font-semibold transition-all cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={async () => {
                  const action = confirmModal.onConfirm;
                  setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                  await action();
                }}
                className="px-4 py-2 rounded-xl bg-status-error text-white font-label-md font-bold hover:bg-status-error/90 transition-all cursor-pointer shadow-md"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
