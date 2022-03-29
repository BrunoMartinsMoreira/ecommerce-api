import { Request, Response } from 'express';
import { CreateSessionService } from '../services/CreateSessionService';

export class UserSessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = new CreateSessionService();
    const user = createSession.execute({ email, password });
    return res.json(user);
  }
}
