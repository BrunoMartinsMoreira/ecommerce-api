import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/ResetPasswordControle';

const forgotPasswordRouter = Router();
const forgotPassword = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();

forgotPasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPassword.create,
);

forgotPasswordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassword.create,
);
export { forgotPasswordRouter };
