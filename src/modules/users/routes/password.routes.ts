import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';

const forgotPasswordRouter = Router();
const forgotPassword = new ForgotPasswordController();

forgotPasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPassword.create,
);
export { forgotPasswordRouter };
