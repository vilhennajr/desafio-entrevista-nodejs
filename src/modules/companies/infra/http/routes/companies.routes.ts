import { Router } from 'express';
import CompaniesController from '../controllers/CompaniesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.use(isAuthenticated);

companiesRouter.get('/', companiesController.index);

companiesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  companiesController.show,
);

companiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cnpj: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      parking_spaces_motorcycles: Joi.number().required(),
      parking_spaces_cars: Joi.number().required(),
    },
  }),
  companiesController.create,
);

companiesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      parking_spaces_motorcycles: Joi.number().required(),
      parking_spaces_cars: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  companiesController.update,
);

companiesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  companiesController.delete,
);

export default companiesRouter;
