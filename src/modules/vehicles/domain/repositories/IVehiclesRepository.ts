import { IVehicle } from '../models/IVehicle';
import { IVehiclePaginate } from '../models/IVehiclePaginate';
import { ICreateVehicle } from '../models/ICreateVehicle';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IVehiclesRepository {
  create(data: ICreateVehicle): Promise<IVehicle>;
  save(vehicle: IVehicle): Promise<IVehicle>;
  findAll({ page, skip, take }: SearchParams): Promise<IVehiclePaginate>;
  findById(id: string): Promise<IVehicle | null>;
  remove(vehicle: IVehicle): Promise<void>;
}
