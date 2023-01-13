import { Router } from 'express';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const routes = Router();

routes.use('/companies', isAuthenticated, companiesRouter);
routes.use('/users', isAuthenticated, usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
