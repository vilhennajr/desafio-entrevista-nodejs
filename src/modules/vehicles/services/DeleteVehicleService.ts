import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteVehicle } from '../domain/models/IDeleteVehicle';
import { IVehiclesRepository } from '../domain/repositories/IVehiclesRepository';

@injectable()
class DeleteVehicleService {

  constructor(

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository

  ) {}

  public async execute({ id }: IDeleteVehicle): Promise<void> {
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      throw new AppError('Vehicle not found.');
    }

    await this.vehiclesRepository.remove(vehicle);
  }
}

export default DeleteVehicleService;
