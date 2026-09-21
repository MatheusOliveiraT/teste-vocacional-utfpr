import { Router } from 'express';
import testRoutes from './testRoutes';
import dashboardRoutes from './dashboardRoutes';

const routes = Router();

routes.use('/test', testRoutes);
routes.use('/dashboard', dashboardRoutes);

export default routes;