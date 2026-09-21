import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/utils";
import { AdminStudent } from "@/types";

export interface StudentRowProps {
  student: AdminStudent;
  checked: boolean;
  onToggle: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function StudentRow({
  student,
  checked,
  onToggle,
  onView,
  onEdit,
  onDelete,
}: StudentRowProps) {
  // A API atual não retorna série/turno do estudante nem duelos por
  // resposta individual — ver comentário em `AdminStudent` (types/index.ts).
  const metaLine = [student.grade, student.shift].filter(Boolean).join(" • ");
  const hasDuelsInfo =
    typeof student.duelsCompleted === "number" &&
    typeof student.duelsTotal === "number";

  return (
    <tr className="hover:bg-surface-track/50 transition-colors group">
      <td className="py-3.5 px-4 text-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="w-4 h-4 rounded bg-surface-card accent-primary-container cursor-pointer"
        />
      </td>
      <td className="py-3.5 px-4">
        <div className="flex flex-col">
          <span className="font-label-lg text-label-lg text-text-high-contrast group-hover:text-primary-container transition-colors">
            {student.name}
          </span>
          {metaLine && (
            <span className="text-text-muted font-body-sm text-[13px]">
              {metaLine}
            </span>
          )}
        </div>
      </td>
      <td className="py-3.5 px-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-track text-on-surface font-body-sm text-[13px]">
          {student.school}
        </span>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2">
          {typeof student.topMatchPercent === "number" && (
            <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm bg-primary-container text-on-primary-container font-semibold">
              {student.topMatchPercent}%
            </span>
          )}
          <span className="font-body-md text-body-md text-text-high-contrast font-medium">
            {student.topMatchCourse}
          </span>
        </div>
      </td>
      <td className="py-3.5 px-4">
        {hasDuelsInfo ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-track text-primary-container font-label-sm text-label-sm">
            <Icon name="check_circle" className="text-[15px]" />
            {student.duelsCompleted}/{student.duelsTotal}
          </span>
        ) : (
          <span className="text-text-muted font-body-sm text-[13px]">—</span>
        )}
      </td>
      <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
        {formatDate(student.date)}
      </td>
      <td className="py-3.5 px-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            title="Visualizar Detalhes"
            onClick={onView}
            className="p-1.5 rounded hover:bg-surface-track text-text-muted hover:text-text-high-contrast transition-colors"
          >
            <Icon name="visibility" className="text-[19px]" />
          </button>
          <button
            type="button"
            title="Editar Registro"
            onClick={onEdit}
            className="p-1.5 rounded hover:bg-surface-track text-text-muted hover:text-primary-container transition-colors"
          >
            <Icon name="edit" className="text-[19px]" />
          </button>
          <button
            type="button"
            title="Excluir Registro"
            onClick={onDelete}
            className="p-1.5 rounded hover:bg-surface-track text-text-muted hover:text-status-error transition-colors"
          >
            <Icon name="delete" className="text-[19px]" />
          </button>
        </div>
      </td>
    </tr>
  );
}
