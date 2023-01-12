import { Router } from 'express';
import companiesRouter from '@modules/companies/routes/companies.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/users', usersRouter);

export default routes;
