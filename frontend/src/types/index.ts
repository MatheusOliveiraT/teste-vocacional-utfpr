export interface Highlight {
  icon: string;
  title: string;
  subtitle: string;
}

export interface CampusImage {
  src: string;
  alt: string;
  caption: string;
  badge: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface DuelOption {
  key: "A" | "B";
  label: string;
  icon: string;
}

export interface DuelQuestion {
  index: number;
  total: number;
  question: string;
  subtitle: string;
  contextLabel: string;
  options: [DuelOption, DuelOption];
}

export interface RankedCourse {
  rank: number;
  name: string;
  percent: number;
  degreeType: string;
  semesters: number;
  topMatch?: boolean;
}

export type CourseCategory =
  | "computacao"
  | "engenharia"
  | "ciencias-agro";

export interface CourseCatalogItem {
  id: string;
  category: CourseCategory;
  title: string;
  degreeType: string;
  vagas: string;
  duration: string;
  turno?: string;
  icon: string;
  description: string;
  focusTags: string[];
  image: string;
  imageAlt: string;
  primaryAction: "matriz" | "mercado";
  matrixUrl?: string;
}

export interface CourseFilterOption {
  category: "all" | CourseCategory;
  label: string;
  icon: string;
  count: number;
}

export interface AdmissionPathway {
  icon: string;
  title: string;
  description: string;
  tag: string;
}

export interface BreakdownItem {
  label: string;
  value: string;
  percent: number;
  barColorClass: string;
  emphasized?: boolean;
}

/**
 * Formato consumido pelos componentes do painel administrativo (tabela,
 * KPIs, filtros). É preenchido a partir da API real pelo adapter em
 * `lib/admin-source.ts` — ver `types/external-api.ts` para o formato bruto.
 */
export interface AdminStudent {
  id: string;
  name: string;
  /** Nome de exibição da escola, já resolvido a partir do id via `/api/test/options`. */
  school: string;
  /** Id bruto da escola (`ExternalTestResult.schoolName`), usado para filtrar com precisão. */
  schoolId: string;
  topMatchCourse: string;
  /** Id do curso/perfil top match, usado para filtrar com precisão. */
  topMatchCourseId: string;
  /**
   * A API atual (`GET /api/test/results`) não retorna percentual de
   * afinidade, série/turno do estudante nem quantidade de duelos por
   * resposta individual — só o perfil vencedor. Esses campos ficam
   * opcionais até o backend expor esses dados por resposta.
   */
  topMatchPercent?: number;
  grade?: string;
  shift?: string;
  duelsCompleted?: number;
  duelsTotal?: number;
  /** Melhor data disponível (hoje: `profile.createdAt`, não a data da resposta em si). */
  date?: string;
}

export interface AdminKpis {
  totalResponses: { value: string; trend: string };
  schoolsMapped: { value: string; label: string };
  topCourse: { name: string; share: string; runnerUp: string };
  completionRate: { value: string; avgDuels: string };
}

export interface AdminFilterOptions {
  schools: SelectOption[];
  courses: SelectOption[];
}

/**
 * Formato JSON retornado por `GET /api/admin` (nosso BFF interno, que por
 * sua vez busca dados da API real do backend). Este é o contrato entre o
 * front-end e essa rota.
 */
export interface AdminDashboardData {
  kpis: AdminKpis;
  schoolBreakdown: BreakdownItem[];
  courseAffinityBreakdown: BreakdownItem[];
  students: AdminStudent[];
  totalResponses: number;
  filterOptions: AdminFilterOptions;
}

/**
 * Corpo aceito por `POST /api/admin/students` (criação ou edição).
 * Observação: a API real ainda não expõe endpoints de escrita para
 * respostas — ver comentário em `lib/admin-source.ts`.
 */
export interface AdminStudentInput {
  id?: string;
  name: string;
  schoolId: string;
  profileId: string;
}
