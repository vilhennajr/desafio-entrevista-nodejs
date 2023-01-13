import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IVehicle } from '../domain/models/IVehicle';
import { ICreateVehicle } from '../domain/models/ICreateVehicle';
import { IVehiclesRepository } from '../domain/repositories/IVehiclesRepository';

@injectable()
class CreateVehicleService {

  constructor(

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository

  ) {}

  public async execute({
    brand,
    model,
    color,
    sign,
    type,
  }: ICreateVehicle): Promise<IVehicle> {

    const vehicle = await this.vehiclesRepository.create({
      brand,
      model,
      color,
      sign,
      type,
    });

    return vehicle;
  }
}

export default CreateVehicleService;
