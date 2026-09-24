import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'utfpr_vocational_super_secret_key_2026';

// Credenciais do Admin (Pode ser via .env ou banco de dados)
const ADMIN_USER = process.env.ADMIN_USER || 'admin@utfpr.edu.br';
// Hash para a senha padrão: 'utfpr2026'
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || bcrypt.hashSync('utfpr2026', 10);

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email !== ADMIN_USER || !bcrypt.compareSync(password, ADMIN_PASS_HASH)) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    }

    // Gerar token válido por 8 horas
    const token = jwt.sign({ email, role: 'ADMIN' }, JWT_SECRET, { expiresIn: '8h' });

    // Enviar cookie HTTP-Only seguro
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000, // 8 horas
    });

    return res.status(200).json({ message: 'Autenticado com sucesso!', user: { email } });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('admin_token');
    return res.status(200).json({ message: 'Sessão encerrada com sucesso.' });
  }

  async me(req: Request, res: Response) {
    return res.status(200).json({ authenticated: true, admin: (req as any).admin });
  }
}