import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteUser } from '../domain/models/IDeleteUser';
import { IUserRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class DeleteUserService {

  constructor(

    @inject('UsersRepository')
    private usersRepository: IUserRepository

  ) {}

  public async execute({ id }: IDeleteUser): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await this.usersRepository.remove(user);
  }
}

export default DeleteUserService;
