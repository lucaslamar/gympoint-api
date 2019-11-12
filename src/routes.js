import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import MatriculationController from './app/controllers/MatriculationController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/matriculations', MatriculationController.index);
routes.post('/matriculations', MatriculationController.store);
routes.put('/matriculations/:id', MatriculationController.update);
routes.delete('/matriculations/:id', MatriculationController.delete);

export default routes;
