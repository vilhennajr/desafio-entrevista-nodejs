import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateVehicleService from '../../../services/CreateVehicleService';
import DeleteVehicleService from '../../../services/DeleteVehicleService';
import ListVehicleService from '../../../services/ListVehicleService';
import ShowVehicleService from '../../../services/ShowVehicleService';
import UpdateVehicleService from '../../../services/UpdateVehicleService';

export default class VehiclesController {
  public async index(request: Request, response: Response): Promise<Response> {

    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listVehicles = container.resolve(ListVehicleService);
    const vehicles = await listVehicles.execute({ page, limit });

    return response.json(vehicles);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showVehicle = container.resolve(ShowVehicleService);

    const vehicle = await showVehicle.execute({ id });

    return response.json(vehicle);

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      model,
      color,
      sign,
      type,
    } = request.body;

    const createVehicle = container.resolve(CreateVehicleService);

    const vehicle = await createVehicle.execute({
      brand,
      model,
      color,
      sign,
      type,
    });

    return response.json(vehicle);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      model,
      color,
      sign,
      type,
    } = request.body;
    const { id } = request.params;

    const updateVehicle = container.resolve(UpdateVehicleService);

    const vehicle = await updateVehicle.execute({
      id,
      brand,
      model,
      color,
      sign,
      type,
    });

    return response.json(vehicle);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteVehicle = container.resolve(DeleteVehicleService);

    await deleteVehicle.execute({ id });

    return response.json([]);
  }
}
