import { Router } from 'express';
import { productsRouter } from '@modules/products/infra/http/routes/products.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { forgotPasswordRouter } from '@modules/users/infra/http/routes/password.routes';
import { customerRouter } from '@modules/customers/infra/http/routes/customer.routes';
import { ordersRouter } from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', forgotPasswordRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', ordersRouter);

export { routes };
