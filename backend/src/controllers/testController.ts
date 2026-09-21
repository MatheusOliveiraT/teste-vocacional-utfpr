import { Request, Response } from 'express';
import { TestService } from '../services/testService';
import { SubmitTestDTO } from '../types/test';

const testService = new TestService();

export class TestController {
  // GET /api/test/options
  async getOptionsData(req: Request, res: Response) {
    try {
      const data = await testService.getOptionsData();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar escolas e escolaridades.' });
    }
  }

  // GET /api/test/questions
  async listQuestions(req: Request, res: Response) {
    try {
      const questions = await testService.getQuestions();
      return res.json(questions);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar perguntas do teste.' });
    }
  }

  // POST /api/test/submit
  async submitTest(req: Request, res: Response) {
    try {
      const { fullName, schoolLevel, schoolName, selectedOptionIds }: SubmitTestDTO = req.body;

      if (!fullName || !schoolLevel || !schoolName) {
        return res.status(400).json({
          error: 'Preencha todos os campos de identificação (Nome, Série e Escola).',
        });
      }

      if (!selectedOptionIds || selectedOptionIds.length === 0) {
        return res.status(400).json({ error: 'Nenhuma resposta enviada.' });
      }

      const result = await testService.calculateAndSaveResult(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Erro ao processar o resultado do teste.' });
    }
  }

  // GET /api/test/results
  async getResultsData(req: Request, res: Response) {
    try {
      const data = await testService.getResultsData();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar resultados.' });
    }
  }
}