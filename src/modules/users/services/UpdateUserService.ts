import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateUser } from '../domain/models/IUpdateUser';
import User from '../infra/typeorm/entities/User';
import { IUserRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateUserService {

  constructor(

    @inject('UsersRepository')
    private usersRepository: IUserRepository

  ) {}

  public async execute({
    id,
    name,
  }: IUpdateUser): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    user.name = name;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
