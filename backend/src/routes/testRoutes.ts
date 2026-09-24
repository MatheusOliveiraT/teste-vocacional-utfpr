import { Router } from 'express';
import { TestController } from '../controllers/testController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const testController = new TestController();

router.get('/options', (req, res) => testController.getOptionsData(req, res));
router.get('/questions', (req, res) => testController.listQuestions(req, res));
router.post('/submit', (req, res) => testController.submitTest(req, res));

router.get('/results', authMiddleware, (req, res) => testController.getResultsData(req, res));
router.post('/results', authMiddleware,(req, res) => testController.upsertResult(req, res));
router.delete('/results/:id', authMiddleware,(req, res) => testController.deleteResult(req, res));
router.post('/results/bulk-delete', authMiddleware, (req, res) =>
  testController.bulkDeleteResults(req, res)
);

export default router;