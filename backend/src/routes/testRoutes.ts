import { Router } from 'express';
import { TestController } from '../controllers/testController';

const router = Router();
const testController = new TestController();

router.get('/options', (req, res) => testController.getOptionsData(req, res));
router.get('/questions', (req, res) => testController.listQuestions(req, res));
router.get('/results', (req, res) => testController.getResultsData(req, res));
router.post('/submit', (req, res) => testController.submitTest(req, res));

router.post('/results', (req, res) => testController.upsertResult(req, res));
router.delete('/results/:id', (req, res) => testController.deleteResult(req, res));
router.post('/results/bulk-delete', (req, res) =>
  testController.bulkDeleteResults(req, res)
);

export default router;