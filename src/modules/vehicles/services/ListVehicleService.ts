import { inject, injectable } from 'tsyringe';
import { IVehiclesRepository } from '../domain/repositories/IVehiclesRepository';
import { IVehiclePaginate } from '../domain/models/IVehiclePaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListVehicleService {

  constructor(

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository

  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IVehiclePaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const vehicles = await this.vehiclesRepository.findAll({
      page,
      skip,
      take,
    });

    return vehicles;
  }
}

export default ListVehicleService;
