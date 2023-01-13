import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Companie from '../infra/typeorm/entities/Vehicle';
import { IShowVehicle } from '../domain/models/IShowVehicle';
import { IVehiclesRepository } from '../domain/repositories/IVehiclesRepository';

@injectable()
class ShowVehicleService {

  constructor(

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository

  ) {}

  public async execute({ id }: IShowVehicle): Promise<Companie> {
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      throw new AppError('Vehicle not found.');
    }

    return vehicle;
  }
}

export default ShowVehicleService;
