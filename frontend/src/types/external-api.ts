/**
 * Tipos que espelham, campo a campo, o formato retornado pela API real do
 * backend do Teste Vocacional (ex.: http://localhost:4000). Mantidos em um
 * arquivo separado de `types/index.ts` (que descreve o que os *componentes*
 * React esperam) para deixar claro onde termina "o que a API manda" e
 * começa "o que a UI consome" — a camada de adapter em `lib/` faz a ponte.
 */

/** Item de `schools` em GET /api/test/options */
export interface ExternalSchool {
  id: string;
  name: string;
}

/** Item de `schoolLevels` em GET /api/test/options */
export interface ExternalSchoolLevel {
  id: string;
  year: string;
  description: string;
}

/**
 * Item de `profiles` em GET /api/test/options, e também o formato do campo
 * `profile` de cada item em GET /api/test/results. Em `/options` alguns
 * campos vêm resumidos (só id + name); em `/results` o objeto vem completo.
 */
export interface ExternalProfile {
  id: string;
  name: string;
  description?: string;
  degreeType?: string;
  durationYears?: number;
  semesters?: number;
  shift?: string;
  annualVacancies?: number;
  curriculumUrl?: string;
  imageUrl?: string;
  createdAt?: string;
}

/** GET /api/test/options */
export interface ExternalTestOptions {
  schools: ExternalSchool[];
  schoolLevels: ExternalSchoolLevel[];
  profiles: ExternalProfile[];
}

/** `topIndicatedCourse` em GET /api/dashboard/stats */
export interface ExternalTopIndicatedCourse {
  name: string;
  count: number;
  percentage: number;
  secondIndicatedName: string;
  secondIndicatedPercentage: number;
}

/**
 * Item de `responsesBySchool` em GET /api/dashboard/stats.
 * IMPORTANTE: apesar do nome, `schoolName` vem preenchido com o **id** da
 * escola (mesmo valor de `ExternalSchool.id`), não o nome legível — é
 * necessário resolver via `schools` de `/api/test/options`.
 */
export interface ExternalSchoolStat {
  schoolName: string;
  count: number;
  percentage: number;
}

/** Item de `topCoursesAffinity` em GET /api/dashboard/stats */
export interface ExternalCourseAffinityStat {
  courseName: string;
  count: number;
  percentage: number;
}

/** GET /api/dashboard/stats */
export interface ExternalDashboardStats {
  totalResponses: number;
  responsesGrowthPercentage: number;
  totalSchoolsMapped: number;
  completionRatePercentage: number;
  /** Ex.: "30/30" */
  avgDuelsCompleted: string;
  topIndicatedCourse: ExternalTopIndicatedCourse;
  responsesBySchool: ExternalSchoolStat[];
  topCoursesAffinity: ExternalCourseAffinityStat[];
}

/**
 * Item de `results` em GET /api/test/results.
 * IMPORTANTE: `schoolName` também vem como o **id** da escola aqui, não o
 * nome — mesmo tratamento de `ExternalSchoolStat.schoolName`.
 */
export interface ExternalTestResult {
  id: string;
  fullName: string;
  schoolName: string;
  profile: ExternalProfile;
}

/** GET /api/test/results */
export interface ExternalTestResultsResponse {
  results: ExternalTestResult[];
}
