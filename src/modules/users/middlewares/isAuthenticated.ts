import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('not authorized', 401);
  }

  // vem Bearer token do front
  const [, token] = authHeader.split(' ');

  try {
    const verifiedToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch (error) {
    throw new AppError('Invalid token');
  }
}
