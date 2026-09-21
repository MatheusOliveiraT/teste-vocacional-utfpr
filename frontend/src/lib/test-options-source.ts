import { fetchExternalTestOptions } from "@/lib/external-api";
import { SelectOption } from "@/types";

export interface TestOptionsForIdentification {
  schools: SelectOption[];
  grades: SelectOption[];
}

/**
 * Escolas e séries/escolaridade para o formulário de identificação do
 * estudante, a partir de `GET /api/test/options`. Os `profiles` (cursos)
 * desse mesmo endpoint são usados no painel administrativo
 * (`lib/admin-source.ts`), não aqui.
 */
export async function getIdentificationOptions(): Promise<TestOptionsForIdentification> {
  const options = await fetchExternalTestOptions();

  return {
    schools: options.schools.map((school) => ({
      value: school.id,
      label: school.name,
    })),
    grades: options.schoolLevels.map((level) => ({
      value: level.id,
      label: `${level.year} — ${level.description}`,
    })),
  };
}
