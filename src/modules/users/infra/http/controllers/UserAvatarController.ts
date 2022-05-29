import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { UpadateUserAvatarService } from '../../../services/UpdateUserAvatarService';

export class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpadateUserAvatarService();

    const user = updateAvatar.execute({
      userId: req.user.id,
      avatarFileName: req.file?.filename as string, // coloquei isso aqui pq tava dando erro, funcionou nao sei pq,
    });

    return res.json(classToClass(user));
  }
}
