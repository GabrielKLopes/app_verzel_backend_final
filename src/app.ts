import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from './routes/index.routes';
import { AppDataSource } from './data-source';

const app = express();

// Configuração de CORS
app.use(cors({
  //origin: 'https://verzel-app-front-7rrl.vercel.app',
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Middleware para JSON e cookies
app.use(express.json());
app.use(cookieParser());

// Tratamento de requisições prévias (OPTIONS)
app.options('*', cors({
  //origin: 'https://verzel-app-front-7rrl.vercel.app',
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Rotas
app.use('/', routes);

// Verificação da aplicação
app.get('/', (req, res) => {
  return res.send('Aplicação rodando na porta 4000');
});

AppDataSource.initialize().then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao inicializar a conexão com o banco de dados:', error);
});
export default app;
