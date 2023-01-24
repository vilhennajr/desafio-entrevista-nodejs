import { Router } from 'express';
import VehiclesController from '../controllers/VehiclesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const vehiclesRouter = Router();
const vehiclesController = new VehiclesController();

vehiclesRouter.use(isAuthenticated);

vehiclesRouter.get('/', vehiclesController.index);

vehiclesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  vehiclesController.show,
);

vehiclesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      brand: Joi.string().required(),
      model: Joi.string().required(),
      color: Joi.string().required(),
      sign: Joi.string().required(),
      type: Joi.number().required(),
    },
  }),
  vehiclesController.create,
);

vehiclesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      brand: Joi.string().required(),
      model: Joi.string().required(),
      color: Joi.string().required(),
      sign: Joi.string().required(),
      type: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  vehiclesController.update,
);

vehiclesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  vehiclesController.delete,
);

export default vehiclesRouter;
