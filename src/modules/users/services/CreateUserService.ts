import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUserRepository } from '../domain/repositories/IUsersRepository';
import { hash } from 'bcryptjs';

@injectable()
class CreateUserService {

  constructor(

    @inject('UsersRepository')
    private usersRepository: IUserRepository

  ) {}

  public async execute({
    name,
    cpf,
    password,
  }: ICreateUser): Promise<IUser> {
    const userExists = await this.usersRepository.findByCpf(cpf);

    if (userExists) {
      throw new AppError('There is already one user with this cpf');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      cpf,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
