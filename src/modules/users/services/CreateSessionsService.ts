import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUsersRepository';

interface IRequest {
  cpf: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class CreateSessionsService {

  constructor(

    @inject('UsersRepository')
    private usersRepository: IUserRepository

  ) {}

  public async execute({
    cpf,
    password,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError('Incorrect cpf/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect cpf/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
