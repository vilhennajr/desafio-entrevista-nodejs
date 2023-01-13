import { IVehicle } from './IVehicle';

export interface IVehiclePaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IVehicle[];
}
