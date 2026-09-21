export interface DashboardStatsDTO {
  // 1. Cards de Resumo (Topo)
  totalResponses: number;          // Ex: 1248
  responsesGrowthPercentage: number; // Ex: 18
  totalSchoolsMapped: number;      // Ex: 14
  completionRatePercentage: number; // Ex: 94.2
  avgDuelsCompleted: string;        // Ex: "36/36"

  // Informações do curso mais indicado (Card 3)
  topIndicatedCourse: {
    name: string;
    count: number;                  // Ex: 312
    percentage: number;             // Ex: 25
    secondIndicatedName?: string;   // Ex: "Eng. Eletrônica"
    secondIndicatedPercentage?: number; // Ex: 18
  } | null;

  // 2. Gráfico/Lista: Respostas por Escola (Top 5)
  responsesBySchool: {
    schoolName: string;
    count: number;
    percentage: number;
  }[];

  // 3. Gráfico/Lista: Top Cursos de Maior Afinidade
  topCoursesAffinity: {
    courseName: string;
    count: number;
    percentage: number;
  }[];
}