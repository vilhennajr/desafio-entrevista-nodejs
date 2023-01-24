import { IUser } from '../models/IUser';
import { IUserPaginate } from '../models/IUserPaginate';
import { ICreateUser } from '../models/ICreateUser';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IUserRepository {
  findByCpf(cpf: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  findAll({ page, skip, take }: SearchParams): Promise<IUserPaginate>;
  findById(id: string): Promise<IUser | null>;
  remove(user: IUser): Promise<void>;
}
