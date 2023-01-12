import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  cpf: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ cpf, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError('Incorrect cpf/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect cpf/password combination.', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
