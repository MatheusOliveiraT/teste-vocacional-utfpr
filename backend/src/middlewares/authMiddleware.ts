import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'utfpr_vocational_super_secret_key_2026';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Busca o token nos cookies ou no header Authorization
  const token = req.cookies?.admin_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Sessão não encontrada.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).admin = decoded;
    return next();
  } catch (error) {
    return res.status(403).json({ error: 'Sessão inválida ou expirada.' });
  }
}