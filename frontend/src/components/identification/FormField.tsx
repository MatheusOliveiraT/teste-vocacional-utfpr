import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  icon: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

/**
 * Campo de texto padrão do formulário, com ícone à esquerda e mensagem
 * de erro opcional. Reutilizável em qualquer formulário do produto.
 */
export function FormField({
  id,
  name,
  label,
  icon,
  placeholder,
  required,
  value,
  onChange,
  error,
}: FormFieldProps) {
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
        <input
          id={id}
          name={name}
          type="text"
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full bg-surface-base text-text-high-contrast placeholder:text-text-muted font-body-md text-body-md py-3 pl-10 pr-4 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-primary-container",
            error ? "border-status-error" : "border-border-subtle"
          )}
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
