import { StudentRow } from "@/components/admin/StudentRow";
import { AdminStudent } from "@/types";

export interface StudentsTableProps {
  students: AdminStudent[];
  selectedIds: Set<string>;
  allChecked: boolean;
  onToggleAll: () => void;
  onToggleOne: (id: string) => void;
  onView: (student: AdminStudent) => void;
  onEdit: (student: AdminStudent) => void;
  onDelete: (id: string) => void;
}

export function StudentsTable({
  students,
  selectedIds,
  allChecked,
  onToggleAll,
  onToggleOne,
  onView,
  onEdit,
  onDelete,
}: StudentsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-track text-text-muted font-label-sm text-label-sm uppercase tracking-wider">
            <th scope="col" className="py-3.5 px-4 w-12 text-center">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={onToggleAll}
                className="w-4 h-4 rounded bg-surface-card accent-primary-container cursor-pointer"
              />
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Estudante
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Escola / Colégio
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Curso Top Match
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Duelos
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Data / Horário
            </th>
            <th scope="col" className="py-3.5 px-4 text-right font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="font-body-sm text-body-sm divide-y divide-border-subtle/40">
          {students.length > 0 ? (
            students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                checked={selectedIds.has(student.id)}
                onToggle={() => onToggleOne(student.id)}
                onView={() => onView(student)}
                onEdit={() => onEdit(student)}
                onDelete={() => onDelete(student.id)}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="py-10 px-4 text-center text-text-muted font-body-md text-body-md"
              >
                Nenhuma resposta corresponde aos filtros selecionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
