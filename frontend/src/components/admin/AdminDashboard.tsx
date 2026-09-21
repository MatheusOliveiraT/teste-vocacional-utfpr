"use client";

import { useMemo, useState } from "react";
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
  const [courseId, setCourseId] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<{
    mode: ModalMode;
    student: AdminStudent | null;
  }>({ mode: null, student: null });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const matchesCourse =
        !courseId || student.topMatchCourseId === courseId;
      return matchesQuery && matchesSchool && matchesCourse;
    });
  }, [data.students, query, schoolId, courseId]);

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

  async function handleDeleteOne(id: string) {
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
    } catch (err) {
      setData((prev) => ({ ...prev, students: previousStudents }));
      setError(
        err instanceof Error ? err.message : "Falha ao excluir o registro."
      );
    }
  }

  async function handleDeleteSelected() {
    const idsToDelete = Array.from(selectedIds);
    if (idsToDelete.length === 0) return;

    const previousStudents = data.students;
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => !selectedIds.has(s.id)),
    }));
    setSelectedIds(new Set());

    try {
      await deleteStudentsRequest(idsToDelete);
    } catch (err) {
      setData((prev) => ({ ...prev, students: previousStudents }));
      setError(
        err instanceof Error
          ? err.message
          : "Falha ao excluir os registros selecionados."
      );
    }
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
        courseId={courseId}
        onCourseChange={setCourseId}
        onClear={handleClearFilters}
        visibleCount={filteredStudents.length}
        totalCount={data.totalResponses}
        filterOptions={data.filterOptions}
      />

      <section className="bg-surface-card rounded-xl shadow-sm overflow-hidden flex flex-col">
        <StudentsTable
          students={filteredStudents}
          selectedIds={selectedIds}
          allChecked={allChecked}
          onToggleAll={toggleAll}
          onToggleOne={toggleOne}
          onView={(student) => setModal({ mode: "view", student })}
          onEdit={(student) => setModal({ mode: "edit", student })}
          onDelete={handleDeleteOne}
        />
        <TablePagination
          totalCount={data.totalResponses}
          selectedCount={selectedIds.size}
          onSelectAll={toggleAll}
          onExportSelected={() => {
            /* Integração real de exportação (CSV/PDF) entraria aqui */
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
    </div>
  );
}
