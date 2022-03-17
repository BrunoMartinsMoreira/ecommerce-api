import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'Router is running' });
});

export { routes };
