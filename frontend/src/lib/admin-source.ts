import {
  bulkDeleteExternalTestResults,
  createOrUpdateExternalTestResult,
  deleteExternalTestResult,
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
import {
  ExternalSchoolLevel,
  ExternalTestOptions,
  ExternalTestResult,
} from "@/types/external-api";

/**
 * -----------------------------------------------------------------------
 * Adapter entre a API real do backend (três endpoints de leitura —
 * /api/test/options, /api/dashboard/stats, /api/test/results — e três de
 * escrita — POST/DELETE /api/test/results, POST /api/test/results/bulk-delete)
 * e o formato (`AdminDashboardData`) que os componentes do painel
 * (`KpiGrid`, `AnalyticsSection`, `StudentsTable`, ...) esperam.
 * -----------------------------------------------------------------------
 */

function buildNameMap(items: { id: string; name: string }[]): Map<string, string> {
  return new Map(items.map((item) => [item.id, item.name]));
}

function buildSchoolLevelMap(levels: ExternalSchoolLevel[]): Map<string, string> {
  return new Map(levels.map((level) => [level.id, `${level.year} — ${level.description}`]));
}

/** `schoolName`/`schoolLevel` na API real vêm como id — resolve para o rótulo de exibição. */
function resolveLabel(idOrRaw: string | undefined, labels: Map<string, string>) {
  if (!idOrRaw) return undefined;
  return labels.get(idOrRaw) ?? idOrRaw;
}

const BAR_COLOR_CYCLE = [
  "bg-primary-container",
];

function toBreakdown(
  items: { label: string; count: number; percentage: number }[],
  unitLabel: "respostas" | "alunos"
): BreakdownItem[] {
  return items.map((item, index) => ({
    label: item.label,
    value: `${item.count} ${unitLabel} (${item.percentage}%)`,
    // Mantém a porcentagem real, garantindo no mínimo 3% para percentuais pequenos ficarem bem visíveis
    percent: Math.max(item.percentage, 3),
    barColorClass: BAR_COLOR_CYCLE[index % BAR_COLOR_CYCLE.length],
    emphasized: index === 0,
  }));
}

function toAdminStudent(
  result: ExternalTestResult,
  schoolNames: Map<string, string>,
  schoolLevelLabels: Map<string, string>
): AdminStudent {
  return {
    id: result.id,
    name: result.fullName,
    school: resolveLabel(result.schoolName, schoolNames) ?? result.schoolName,
    schoolId: result.schoolName,
    topMatchCourse: result.profile.name,
    topMatchCourseId: result.profile.id,
    grade: resolveLabel(result.schoolLevel, schoolLevelLabels),
    schoolLevelId: result.schoolLevel,
    shift: result.profile.shift,
    date: result.createdAt ?? result.profile.createdAt,
  };
}

export async function getDashboardData(): Promise<AdminDashboardData> {
  const [options, stats, resultsResponse] = await Promise.all([
    fetchExternalTestOptions(),
    fetchExternalDashboardStats(),
    fetchExternalTestResults(),
  ]);

  const schoolNames = buildNameMap(options.schools);
  const schoolLevelLabels = buildSchoolLevelMap(options.schoolLevels);

  const students = resultsResponse.results.map((result) =>
    toAdminStudent(result, schoolNames, schoolLevelLabels)
  );

  // `topIndicatedCourse` pode vir `null` quando ainda não há respostas.
  const topCourse = stats.topIndicatedCourse;

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
      topCourse: topCourse
        ? {
            name: topCourse.name,
            share: `${topCourse.count} recomendações (${topCourse.percentage}%)`,
            runnerUp: topCourse.secondIndicatedName
              ? `Seguido por ${topCourse.secondIndicatedName} (${topCourse.secondIndicatedPercentage}%)`
              : "Ainda não há um segundo colocado",
          }
        : {
            name: "Nenhuma resposta ainda",
            share: "0 recomendações (0%)",
            runnerUp: "Aguardando as primeiras respostas",
          },
      completionRate: {
        value: `${stats.completionRatePercentage}%`,
        avgDuels: stats.avgDuelsCompleted,
      },
    },
    schoolBreakdown: toBreakdown(
      stats.responsesBySchool.map((item) => ({
        label: resolveLabel(item.schoolName, schoolNames) ?? item.schoolName,
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
    students,
    totalResponses: stats.totalResponses,
    filterOptions: {
      schools: options.schools.map((school) => ({
        value: school.id,
        label: school.name,
      })),
      grades: options.schoolLevels.map((level) => ({
        value: level.id,
        label: `${level.year} — ${level.description}`,
      })),
      courses: options.profiles.map((profile) => ({
        value: profile.id,
        label: profile.name,
      })),
    },
  };
}

async function resolveMaps(options?: ExternalTestOptions) {
  const testOptions = options ?? (await fetchExternalTestOptions());
  return {
    schoolNames: buildNameMap(testOptions.schools),
    schoolLevelLabels: buildSchoolLevelMap(testOptions.schoolLevels),
  };
}

/** Cria (sem `id`) ou edita (com `id`) uma resposta, via `POST /api/test/results`. */
export async function upsertStudent(
  input: AdminStudentInput
): Promise<AdminStudent> {
  const saved = await createOrUpdateExternalTestResult({
    id: input.id,
    fullName: input.name,
    schoolLevel: input.schoolLevelId,
    schoolName: input.schoolId,
    profileId: input.profileId,
  });

  const { schoolNames, schoolLevelLabels } = await resolveMaps();
  return toAdminStudent(saved, schoolNames, schoolLevelLabels);
}

/** `DELETE /api/test/results/:id` */
export async function deleteStudentById(id: string): Promise<void> {
  await deleteExternalTestResult(id);
}

/** `POST /api/test/results/bulk-delete` */
export async function deleteStudentsByIds(ids: string[]): Promise<void> {
  await bulkDeleteExternalTestResults(ids);
}
