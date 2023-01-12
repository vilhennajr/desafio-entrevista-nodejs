import { Router } from 'express';
import companiesRouter from '@modules/companies/routes/companies.routes';

const routes = Router();

routes.use('/companies', companiesRouter);

export default routes;
