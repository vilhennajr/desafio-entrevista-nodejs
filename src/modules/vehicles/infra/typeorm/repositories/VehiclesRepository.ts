import { IVehiclePaginate } from '@modules/vehicles/domain/models/IVehiclePaginate';
import { ICreateVehicle } from '@modules/vehicles/domain/models/ICreateVehicle';
import { IVehiclesRepository } from '@modules/vehicles/domain/repositories/IVehiclesRepository';
import { Repository } from 'typeorm';
import Vehicle from '../entities/Vehicle';
import { SearchParams } from '../../../domain/repositories/IVehiclesRepository';
import { dataSource } from '@shared/infra/typeorm';

class VehicleRepository implements IVehiclesRepository {

  private ormRepository: Repository<Vehicle>

  constructor() {
    this.ormRepository = dataSource.getRepository(Vehicle);
  }

  public async create({ brand, model, color, sign, type }: ICreateVehicle): Promise<Vehicle> {

    const vehicle = this.ormRepository.create({ brand, model, color, sign, type });

    await this.ormRepository.save(vehicle);

    return vehicle;

  }

  public async save(vehicle: Vehicle): Promise<Vehicle> {

    await this.ormRepository.save(vehicle);

    return vehicle;

  }

  public async findById(id: string): Promise<Vehicle | null> {
    const vehicle = this.ormRepository.findOneBy({ id: Number(id) });
    return vehicle;
  }

  public async remove(vehicle: Vehicle): Promise<void> {
    await this.ormRepository.remove(vehicle);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IVehiclePaginate> {
    const [
      vehicles,
      count,
    ] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: vehicles,
    };

    return result;
  }

}

export default VehicleRepository;
