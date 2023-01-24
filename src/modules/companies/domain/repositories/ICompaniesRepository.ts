import { ICompanie } from '../models/ICompanie';
import { ICompaniePaginate } from '../models/ICompaniePaginate';
import { ICreateCompanie } from '../models/ICreateCompanie';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICompaniesRepository {
  findByCnpj(cnpj: string): Promise<ICompanie | null>;
  create(data: ICreateCompanie): Promise<ICompanie>;
  save(companie: ICompanie): Promise<ICompanie>;
  findAll({ page, skip, take }: SearchParams): Promise<ICompaniePaginate>;
  findById(id: string): Promise<ICompanie | null>;
  remove(companie: ICompanie): Promise<void>;
}
