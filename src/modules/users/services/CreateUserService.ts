import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  cpf: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, cpf, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const cpfExists = await usersRepository.findByCpf(cpf);

    if (cpfExists) {
      throw new AppError('CPF already used.');
    }

    const user = usersRepository.create({
      name,
      cpf,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
