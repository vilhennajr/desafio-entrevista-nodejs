import { ICompanie } from './ICompanie';

export interface ICompaniePaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: ICompanie[];
}
