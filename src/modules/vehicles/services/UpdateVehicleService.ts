import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateVehicle } from '../domain/models/IUpdateVehicle';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import { IVehiclesRepository } from '../domain/repositories/IVehiclesRepository';

@injectable()
class UpdateVehicleService {

  constructor(

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository

  ) {}

  public async execute({
    id,
    brand,
    model,
    color,
    sign,
    type,
  }: IUpdateVehicle): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      throw new AppError('Vehicle not found.');
    }

    vehicle.brand = brand;
    vehicle.model = model;
    vehicle.color = color;
    vehicle.sign = sign;
    vehicle.type = type;

    await this.vehiclesRepository.save(vehicle);

    return vehicle;
  }
}

export default UpdateVehicleService;
