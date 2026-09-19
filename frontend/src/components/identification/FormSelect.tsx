import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/types";

export interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  icon: string;
  placeholder: string;
  required?: boolean;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string | null;
}

/**
 * Select padrão do formulário, com ícone à esquerda e seta customizada.
 * Reutilizável para qualquer lista de opções (série, escola, etc.)
 */
export function FormSelect({
  id,
  name,
  label,
  icon,
  placeholder,
  required,
  value,
  options,
  onChange,
  error,
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-label-lg text-label-lg text-text-high-contrast flex items-center gap-1"
      >
        <span>{label}</span>
        {required && (
          <span className="text-primary-container" title="Obrigatório">
            *
          </span>
        )}
      </label>
      <div className="relative flex items-center">
        <Icon
          name={icon}
          className="absolute left-3.5 text-text-muted text-[18px] pointer-events-none"
        />
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full bg-surface-base text-text-high-contrast font-body-md text-body-md py-3 pl-10 pr-10 rounded-lg appearance-none border transition-all focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer",
            error ? "border-status-error" : "border-border-subtle"
          )}
        >
          <option value="" disabled className="text-text-muted">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-surface-card text-text-high-contrast"
            >
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="unfold_more"
          className="absolute right-3.5 text-text-muted text-[20px] pointer-events-none"
        />
      </div>
      {error && (
        <p className="font-label-sm text-label-sm text-status-error">
          {error}
        </p>
      )}
    </div>
  );
}
