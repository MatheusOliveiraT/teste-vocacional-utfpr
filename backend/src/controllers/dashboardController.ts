import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboardService';
import prisma from '../config/prisma';

const dashboardService = new DashboardService();

export class DashboardController {
  async getStats(req: Request, res: Response) {
    try {
      const stats = await dashboardService.getDashboardStats();
      return res.status(200).json(stats);
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || 'Erro ao carregar os dados da dashboard.',
      });
    }
  }

  async exportCSV(req: Request, res: Response) {
    try {
      // 1. Busca os resultados, escolas e escolaridades em paralelo
      const [results, schools, schoolLevels] = await Promise.all([
        prisma.testResult.findMany({
          include: { profile: true },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.school.findMany(),
        prisma.schoolLevel.findMany(),
      ]);

      // 2. Mapeia os UUIDs para os nomes legíveis
      const schoolMap = new Map(schools.map((s) => [s.id, s.name]));
      const levelMap = new Map(schoolLevels.map((l) => [l.id, `${l.year} - ${l.description}`]));

      // Cabeçalho do CSV (removido a coluna de ID para limpar a visualização)
      let csvContent = 'Data,Nome do Estudante,Escola,Escolaridade,Curso Indicado\n';

      // 3. Monta as linhas trocando os UUIDs pelos nomes
      results.forEach((row) => {
        const date = new Date(row.createdAt).toLocaleDateString('pt-BR');
        const name = `"${row.fullName.replace(/"/g, '""')}"`;

        // Resolve o nome da escola (se for UUID, pega do mapa; caso contrário, usa o texto puro)
        const schoolResolved = schoolMap.get(row.schoolName) || row.schoolName;
        const school = `"${schoolResolved.replace(/"/g, '""')}"`;

        // Resolve a escolaridade (se for UUID, pega do mapa; caso contrário, usa o texto puro)
        const levelResolved = levelMap.get(row.schoolLevel) || row.schoolLevel;
        const level = `"${levelResolved.replace(/"/g, '""')}"`;

        const course = `"${row.profile?.name.replace(/"/g, '""') || 'N/A'}"`;

        csvContent += `${date},${name},${school},${level},${course}\n`;
      });

      // Configura a resposta com suporte a acentuação no Excel (\uFEFF)
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=respostas_utfpr_${Date.now()}.csv`);

      return res.status(200).send('\uFEFF' + csvContent);
    } catch (err: any) {
      return res.status(500).json({ error: 'Erro ao gerar o arquivo CSV. ' + err.message });
    }
  }
}
