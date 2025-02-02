import { IUserPaginate } from '@modules/users/domain/models/IUserPaginate';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import User from '../entities/User';
import { SearchParams } from '../../../domain/repositories/IUsersRepository';
import { dataSource } from '@shared/infra/typeorm';

class UserRepository implements IUserRepository {

  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create({ name, cpf, password }: ICreateUser): Promise<User> {

    const user = this.ormRepository.create({ name, cpf, password });

    await this.ormRepository.save(user);

    return user;

  }

  public async save(user: User): Promise<User> {

    await this.ormRepository.save(user);

    return user;

  }

  public async findByCpf(cpf: string): Promise<User | null> {
    const user = this.ormRepository.findOneBy({ cpf });
    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.ormRepository.findOneBy({ id: Number(id) });
    return user;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IUserPaginate> {
    const [
      users,
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
      data: users,
    };

    return result;
  }

}

export default UserRepository;
