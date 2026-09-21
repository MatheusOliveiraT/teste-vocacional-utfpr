import prisma from '../config/prisma';

export class DashboardService {
  async getDashboardStats() {
    const totalQuestionsInTest = 30; // Total de duelos do teste

    // Consulta de métricas agregadas em paralelo no banco
    const [
      totalResponses,
      schoolsMappedCount,
      groupedBySchool,
      groupedByProfile,
    ] = await Promise.all([
      // Total geral de testes concluídos/salvos
      prisma.testResult.count(),

      // Quantidade de escolas únicas que têm pelo menos 1 resposta
      prisma.testResult.groupBy({
        by: ['schoolName'],
        _count: { schoolName: true },
      }),

      // Ranking de respostas agrupado por Escola
      prisma.testResult.groupBy({
        by: ['schoolName'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),

      // Ranking de cursos mais indicados (vencedores)
      prisma.testResult.groupBy({
        by: ['profileId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),
    ]);

    // Buscar os nomes dos perfis/cursos para os IDs obtidos
    const profileIds = groupedByProfile.map((item) => item.profileId);
    const profiles = await prisma.profile.findMany({
      where: { id: { in: profileIds } },
      select: { id: true, name: true },
    });

    const profileMap = new Map(profiles.map((p) => [p.id, p.name]));

    // 1. Formata: Respostas por Escola (Top 5 + Agrupamento de Restantes)
    const top5Schools = groupedBySchool.slice(0, 5).map((item) => {
      const count = item._count.id;
      const percentage = totalResponses > 0 
        ? Math.round((count / totalResponses) * 100) 
        : 0;

      return {
        schoolName: item.schoolName,
        count,
        percentage,
      };
    });

    // 2. Formata: Top Cursos de Maior Afinidade
    const coursesAffinity = groupedByProfile.map((item) => {
      const count = item._count.id;
      const percentage = totalResponses > 0 
        ? Math.round((count / totalResponses) * 100) 
        : 0;

      return {
        courseName: profileMap.get(item.profileId) || 'Outros Cursos',
        count,
        percentage,
      };
    });

    // Dados do curso mais indicado (1º lugar) e segundo indicado (2º lugar)
    const topCourse = coursesAffinity[0] || null;
    const secondCourse = coursesAffinity[1] || null;

    return {
      totalResponses,
      responsesGrowthPercentage: 18, // Pode ser calculado comparando com os últimos 30 dias se necessário
      totalSchoolsMapped: schoolsMappedCount.length,
      completionRatePercentage: 100, // Padrão de taxa de conclusão dos duelos
      avgDuelsCompleted: `${totalQuestionsInTest}/${totalQuestionsInTest}`,

      topIndicatedCourse: topCourse
        ? {
            name: topCourse.courseName,
            count: topCourse.count,
            percentage: topCourse.percentage,
            secondIndicatedName: secondCourse?.courseName,
            secondIndicatedPercentage: secondCourse?.percentage,
          }
        : null,

      responsesBySchool: top5Schools,
      topCoursesAffinity: coursesAffinity.slice(0, 5),
    };
  }
}