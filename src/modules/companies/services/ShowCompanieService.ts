import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Companie from '../typeorm/entities/Companie';
import CompanieRepository from '../typeorm/repositories/CompaniesRepository';

interface IRequest {
  id: string;
}

class ShowCompanieService {
  public async execute({ id }: IRequest): Promise<Companie> {
    const companiesRepository = getCustomRepository(CompanieRepository);

    const companie = await companiesRepository.findOne(id);

    if (!companie) {
      throw new AppError('Companie not found.');
    }

    return companie;
  }
}

export default ShowCompanieService;
