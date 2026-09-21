import { Router } from 'express';
import { DashboardController } from '../controllers/dashboardController';

const router = Router();
const dashboardController = new DashboardController();

router.get('/stats', (req, res) => dashboardController.getStats(req, res));

export default router;