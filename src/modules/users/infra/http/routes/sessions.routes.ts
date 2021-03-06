import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserSessionController } from '../controllers/UserSessionController';

const sessionsRouter = Router();
const sessionsController = new UserSessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);
export { sessionsRouter };
