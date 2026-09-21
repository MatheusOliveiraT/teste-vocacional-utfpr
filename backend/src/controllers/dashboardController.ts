import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboardService';

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
}