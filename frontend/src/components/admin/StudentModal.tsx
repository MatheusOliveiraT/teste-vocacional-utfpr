"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { AdminFilterOptions, AdminStudent } from "@/types";

export type ModalMode = "view" | "edit" | null;

export interface StudentModalSaveInput {
  name: string;
  schoolId: string;
  schoolLevelId: string;
  profileId: string;
}

export interface StudentModalProps {
  mode: ModalMode;
  student: AdminStudent | null;
  /** Escolas, séries e cursos/perfis reais, vindos de `GET /api/test/options`. */
  filterOptions: AdminFilterOptions;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (updated: StudentModalSaveInput) => void;
}

export function StudentModal({
  mode,
  student,
  filterOptions,
  isSaving = false,
  onClose,
  onSave,
}: StudentModalProps) {
  const [name, setName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [schoolLevelId, setSchoolLevelId] = useState("");
  const [profileId, setProfileId] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name);
      setSchoolId(student.schoolId ?? "");
      setSchoolLevelId(student.schoolLevelId ?? "");
      setProfileId(student.topMatchCourseId ?? "");
      setNotes("");
    }
  }, [student]);

  if (!mode || !student) return null;

  const title =
    mode === "edit"
      ? "Editar Dados do Estudante"
      : "Ficha de Resposta Vocacional";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="bg-surface-card max-w-xl w-full rounded-xl shadow-2xl p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-surface-track flex items-center justify-center text-primary-container">
              <Icon name="badge" className="text-[18px]" />
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-text-high-contrast">
                {title}
              </h3>
              <p className="font-body-sm text-body-sm text-text-muted">
                Visualização e edição direta no banco de dados acadêmico
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-track text-text-muted hover:text-text-high-contrast transition-colors"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <form
          className="flex flex-col gap-space-md"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ name, schoolId, schoolLevelId, profileId });
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-text-high-contrast font-medium">
              Nome Completo
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3.5 py-2.5 rounded-lg bg-surface-track text-text-high-contrast font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-text-high-contrast font-medium">
                Escola / Colégio
              </label>
              <select
                required
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="appearance-none px-3.5 py-2.5 rounded-lg bg-surface-track text-text-high-contrast font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
              >
                <option value="" disabled>
                  Selecione a escola...
                </option>
                {filterOptions.schools.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-text-high-contrast font-medium">
                Série / Escolaridade
              </label>
              <select
                required
                value={schoolLevelId}
                onChange={(e) => setSchoolLevelId(e.target.value)}
                className="appearance-none px-3.5 py-2.5 rounded-lg bg-surface-track text-text-high-contrast font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
              >
                <option value="" disabled>
                  Selecione a série...
                </option>
                {filterOptions.grades.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-text-high-contrast font-medium">
              Curso Indicado (Perfil)
            </label>
            <select
              required
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              className="appearance-none px-3.5 py-2.5 rounded-lg bg-surface-track text-text-high-contrast font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            >
              <option value="" disabled>
                Selecione o curso...
              </option>
              {filterOptions.courses.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-track/70 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">
                Curso Recomendado Top Match:
              </span>
              <span className="text-primary-container font-semibold">
                {student.topMatchCourse}
                {typeof student.topMatchPercent === "number"
                  ? ` (${student.topMatchPercent}%)`
                  : ""}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">
                Progresso no Questionário:
              </span>
              <span className="text-text-high-contrast font-medium">
                {typeof student.duelsCompleted === "number" &&
                typeof student.duelsTotal === "number"
                  ? `${student.duelsCompleted} de ${student.duelsTotal} duelos vocacionais`
                  : "Não informado pela API"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-text-high-contrast font-medium">
              Observações Internas (Coordenação / SEAP)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicionar notas internas sobre o perfil ou contato com o colégio..."
              className="px-3.5 py-2 rounded-lg bg-surface-track text-text-high-contrast font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container placeholder-text-muted"
            />
          </div>

          <div className="flex items-center justify-end gap-space-sm pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-surface-track hover:bg-surface-bright text-text-high-contrast font-label-md text-label-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md hover:bg-brand-yellow-hover font-semibold transition-colors shadow-sm disabled:opacity-60"
            >
              {isSaving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
