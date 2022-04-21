import { Request, Response } from 'express';
import { ShowProfileService } from '../services/ShowProfileService';
import { UpdateProfileService } from '../services/UpdateProfileService';

export class UserProfileController {
  public async show(req: Request, res: Response) {
    const showProfile = new ShowProfileService();
    const user_id = req.user.id;
    const user = await showProfile.execute({ user_id });
    return res.json(user);
  }

  public async update(req: Request, res: Response) {
    const updateProfile = new UpdateProfileService();
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return res.json(user);
  }
}
