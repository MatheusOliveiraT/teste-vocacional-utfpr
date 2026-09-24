import { Router } from 'express';
import { DashboardController } from '../controllers/dashboardController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { AuthController } from '../controllers/authController';

const router = Router();
const dashboardController = new DashboardController();
const authController = new AuthController();

router.post('/admin/login', (req, res) => authController.login(req, res));
router.post('/admin/logout', (req, res) => authController.logout(req, res));
router.get('/admin/me', (req, res) => authController.me(req, res));

router.get('/stats', authMiddleware, (req, res) => dashboardController.getStats(req, res));
router.get('/export/csv', authMiddleware, (req, res) => dashboardController.exportCSV(req, res));

export default router;
