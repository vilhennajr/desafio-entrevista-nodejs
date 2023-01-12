import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CompaniesRepository from '../typeorm/repositories/CompaniesRepository';

interface IRequest {
  id: string;
}

class DeleteCompanieService {
  public async execute({ id }: IRequest): Promise<void> {
    const companiesRepository = getCustomRepository(CompaniesRepository);

    const companie = await companiesRepository.findOne(id);

    if (!companie) {
      throw new AppError('Companie not found.');
    }

    await companiesRepository.remove(companie);
  }
}

export default DeleteCompanieService;
