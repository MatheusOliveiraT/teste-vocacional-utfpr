import {
  fetchExternalDashboardStats,
  fetchExternalTestOptions,
  fetchExternalTestResults,
} from "@/lib/external-api";
import {
  AdminDashboardData,
  AdminStudent,
  AdminStudentInput,
  BreakdownItem,
} from "@/types";
import { ExternalSchool, ExternalTestOptions } from "@/types/external-api";

/**
 * -----------------------------------------------------------------------
 * Adapter entre a API real do backend (localhost:4000 — três endpoints
 * somente leitura: /api/test/options, /api/dashboard/stats e
 * /api/test/results) e o formato (`AdminDashboardData`) que os componentes
 * do painel (`KpiGrid`, `AnalyticsSection`, `StudentsTable`, ...) esperam.
 *
 * IMPORTANTE — limitação conhecida: a API real hoje só expõe leitura. Não
 * existe (ainda) um endpoint para criar, editar ou excluir uma resposta.
 * Para as ações "Nova Resposta Manual", "Editar" e "Excluir" continuarem
 * funcionando na demo, mantemos aqui um pequeno *overlay* local (em
 * memória, via `globalThis`) que é mesclado por cima dos dados reais a
 * cada leitura. Assim que o backend expuser
 * `POST/PATCH/DELETE /api/test/results`, basta trocar `upsertStudent`,
 * `deleteStudentById` e `deleteStudentsByIds` abaixo para chamarem essas
 * rotas de verdade e remover o overlay.
 * -----------------------------------------------------------------------
 */

const BAR_COLOR_CYCLE = [
  "bg-primary-container",
  "bg-brand-yellow-hover",
  "bg-primary-fixed-dim",
  "bg-primary",
  "bg-secondary-container",
  "bg-text-muted/30",
];

interface AdminOverlay {
  /** Estudantes criados manualmente (não existem na API real). */
  created: AdminStudent[];
  /** Edições aplicadas por cima de um estudante vindo da API real ou criado localmente. */
  edited: Record<string, Partial<AdminStudent>>;
  /** Ids excluídos localmente (ocultos mesmo que ainda existam na API real). */
  deletedIds: Set<string>;
}

declare global {
  // eslint-disable-next-line no-var
  var __adminOverlay: AdminOverlay | undefined;
}

function getOverlay(): AdminOverlay {
  if (!globalThis.__adminOverlay) {
    globalThis.__adminOverlay = {
      created: [],
      edited: {},
      deletedIds: new Set(),
    };
  }
  return globalThis.__adminOverlay;
}

function buildSchoolNameMap(schools: ExternalSchool[]): Map<string, string> {
  return new Map(schools.map((school) => [school.id, school.name]));
}

/** `schoolName` na API real vem como id — resolve para o nome de exibição. */
function resolveSchoolName(idOrName: string, schoolNames: Map<string, string>) {
  return schoolNames.get(idOrName) ?? idOrName;
}

function toBreakdown(
  items: { label: string; count: number; percentage: number }[],
  unitLabel: "respostas" | "alunos"
): BreakdownItem[] {
  return items.map((item, index) => ({
    label: item.label,
    value: `${item.count} ${unitLabel} (${item.percentage}%)`,
    percent: item.percentage,
    barColorClass: BAR_COLOR_CYCLE[index % BAR_COLOR_CYCLE.length],
    emphasized: index === 0,
  }));
}

export async function getDashboardData(): Promise<AdminDashboardData> {
  const [options, stats, resultsResponse] = await Promise.all([
    fetchExternalTestOptions(),
    fetchExternalDashboardStats(),
    fetchExternalTestResults(),
  ]);

  const schoolNames = buildSchoolNameMap(options.schools);
  const overlay = getOverlay();

  const students: AdminStudent[] = resultsResponse.results
    .map((result): AdminStudent => ({
      id: result.id,
      name: result.fullName,
      school: resolveSchoolName(result.schoolName, schoolNames),
      schoolId: result.schoolName,
      topMatchCourse: result.profile.name,
      topMatchCourseId: result.profile.id,
      // A API atual não retorna estes campos por resposta individual —
      // veja o comentário de `AdminStudent` em `types/index.ts`.
      topMatchPercent: undefined,
      grade: undefined,
      shift: result.profile.shift,
      duelsCompleted: undefined,
      duelsTotal: undefined,
      date: result.profile.createdAt,
    }))
    .map((student) => ({ ...student, ...overlay.edited[student.id] }));

  const allStudents = [...overlay.created, ...students].filter(
    (student) => !overlay.deletedIds.has(student.id)
  );

  return {
    kpis: {
      totalResponses: {
        value: stats.totalResponses.toLocaleString("pt-BR"),
        trend: `+${stats.responsesGrowthPercentage}%`,
      },
      schoolsMapped: {
        value: stats.totalSchoolsMapped.toString(),
        label: "Instituições",
      },
      topCourse: {
        name: stats.topIndicatedCourse.name,
        share: `${stats.topIndicatedCourse.count} recomendações (${stats.topIndicatedCourse.percentage}%)`,
        runnerUp: `Seguido por ${stats.topIndicatedCourse.secondIndicatedName} (${stats.topIndicatedCourse.secondIndicatedPercentage}%)`,
      },
      completionRate: {
        value: `${stats.completionRatePercentage}%`,
        avgDuels: stats.avgDuelsCompleted,
      },
    },
    schoolBreakdown: toBreakdown(
      stats.responsesBySchool.map((item) => ({
        label: resolveSchoolName(item.schoolName, schoolNames),
        count: item.count,
        percentage: item.percentage,
      })),
      "respostas"
    ),
    courseAffinityBreakdown: toBreakdown(
      stats.topCoursesAffinity.map((item) => ({
        label: item.courseName,
        count: item.count,
        percentage: item.percentage,
      })),
      "alunos"
    ),
    students: allStudents,
    totalResponses: stats.totalResponses,
    filterOptions: {
      schools: options.schools.map((school) => ({
        value: school.id,
        label: school.name,
      })),
      courses: options.profiles.map((profile) => ({
        value: profile.id,
        label: profile.name,
      })),
    },
  };
}

async function resolveNamesFor(
  schoolId: string,
  profileId: string,
  options?: ExternalTestOptions
) {
  const testOptions = options ?? (await fetchExternalTestOptions());
  const school = testOptions.schools.find((s) => s.id === schoolId);
  const profile = testOptions.profiles.find((p) => p.id === profileId);
  return { school, profile };
}

/**
 * Cria ou edita um estudante. Ver aviso no topo do arquivo: enquanto a API
 * real não tiver um endpoint de escrita, isto só existe no overlay local.
 */
export async function upsertStudent(
  input: AdminStudentInput
): Promise<AdminStudent> {
  const overlay = getOverlay();
  const { school, profile } = await resolveNamesFor(
    input.schoolId,
    input.profileId
  );

  if (input.id) {
    const patch: Partial<AdminStudent> = {
      name: input.name,
      schoolId: input.schoolId,
      school: school?.name ?? input.schoolId,
      topMatchCourseId: input.profileId,
      topMatchCourse: profile?.name ?? input.profileId,
    };

    overlay.edited[input.id] = { ...overlay.edited[input.id], ...patch };

    const createdIndex = overlay.created.findIndex((s) => s.id === input.id);
    if (createdIndex >= 0) {
      overlay.created[createdIndex] = {
        ...overlay.created[createdIndex],
        ...patch,
      };
      return overlay.created[createdIndex];
    }

    // Estudante vindo da API real: retornamos como ficaria após o patch,
    // mesmo sem recarregar a lista completa aqui.
    return {
      id: input.id,
      name: input.name,
      school: school?.name ?? input.schoolId,
      schoolId: input.schoolId,
      topMatchCourse: profile?.name ?? input.profileId,
      topMatchCourseId: input.profileId,
      ...patch,
    };
  }

  const created: AdminStudent = {
    id: `manual-${Date.now()}`,
    name: input.name,
    school: school?.name ?? input.schoolId,
    schoolId: input.schoolId,
    topMatchCourse: profile?.name ?? input.profileId,
    topMatchCourseId: input.profileId,
    date: new Date().toISOString(),
  };
  overlay.created = [created, ...overlay.created];
  return created;
}

export async function deleteStudentById(id: string): Promise<void> {
  const overlay = getOverlay();
  overlay.deletedIds.add(id);
  overlay.created = overlay.created.filter((s) => s.id !== id);
}

export async function deleteStudentsByIds(ids: string[]): Promise<void> {
  const overlay = getOverlay();
  ids.forEach((id) => overlay.deletedIds.add(id));
  overlay.created = overlay.created.filter((s) => !ids.includes(s.id));
}
