import { Router } from 'express';
import testRoutes from './testRoutes';

const routes = Router();

routes.use('/test', testRoutes);

export default routes;