import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('not authorized', 401);
  }

  // vem Bearer token do front
  const [, token] = authHeader.split(' ');

  try {
    const verifiedToken = verify(token, authConfig.jwt.secret);
    const { sub } = verifiedToken as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token');
  }
}
