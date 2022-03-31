import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { UsersController } from '../controllers/UsersController';
import { UserAvatarController } from '../controllers/UserAvatarController';
import { isAuthenticated } from '../../../shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const userController = new UsersController();
const avatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, userController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);
export { usersRouter };
