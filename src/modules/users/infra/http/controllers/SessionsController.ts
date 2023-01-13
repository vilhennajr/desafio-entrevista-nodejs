import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionsService from '../../../services/CreateSessionsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      cpf,
      password,
    } = request.body;

    const createSession = container.resolve(CreateSessionsService);

    const session = await createSession.execute({
      cpf,
      password,
    });

    return response.json(session);
  }
}
