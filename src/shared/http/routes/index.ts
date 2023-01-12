import { Router } from 'express';
import companiesRouter from '@modules/companies/routes/companies.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/users', isAuthenticated, usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
