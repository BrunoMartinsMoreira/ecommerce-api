import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { pagination } from 'typeorm-pagination';
import { AppError } from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import { routes } from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors()); // lida com os erros capturados pelo celebrate

// middleware para capturar erros
// eslint-disable-next-line no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
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
