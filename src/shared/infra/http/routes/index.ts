import { Router } from 'express';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import vehiclesRouter from '@modules/vehicles/infra/http/routes/vehicles.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/vehicles', vehiclesRouter);

export default routes;
