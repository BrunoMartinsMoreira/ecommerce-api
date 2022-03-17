import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppError } from '@shared/errors/AppError';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// middleware para capturar erros
app.use((error: Error, req: Request, res: Response) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3333, () => {
  console.log('server is runing');
});
