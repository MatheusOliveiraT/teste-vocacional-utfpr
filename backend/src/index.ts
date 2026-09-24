import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 4000;

// Configuração de CORS com suporte a credenciais (cookies) e suporte à LAN
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origem (Postman, chamadas diretas ou SSR do Next.js)
      if (!origin) return callback(null, true);

      // Permite localhost e redes locais (192.168.x.x, 10.x.x.x, 172.x.x.x)
      const isAllowed =
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.startsWith('http://192.168.') ||
        origin.startsWith('http://10.') ||
        origin.startsWith('http://172.');

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(null, true); // Libera a origem durante o desenvolvimento
    },
    credentials: true, // OBRIGATÓRIO: permite o envio de cookies de login via CORS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(cookieParser()); // Necessário para processar o cookie admin_token nas rotas protegidas

app.use('/api', routes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`⚡ Backend TS rodando na porta ${PORT}`);
});