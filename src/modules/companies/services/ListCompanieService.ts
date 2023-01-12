import { getCustomRepository } from 'typeorm';
import Companie from '../typeorm/entities/Companie';
import CompanieRepository from '../typeorm/repositories/CompaniesRepository';

class ListCompanieService {
  public async execute(): Promise<Companie[]> {
    const companiesRepository = getCustomRepository(CompanieRepository);

    const companies = companiesRepository.find();

    return companies;
  }
}

export default ListCompanieService;
