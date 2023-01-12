import { getCustomRepository } from 'typeorm';
import Companie from '../typeorm/entities/Companie';
import CompanieRepository from '../typeorm/repositories/CompaniesRepository';

interface IPaginateCompanie {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Companie[];
}

class ListCompanieService {
  public async execute(): Promise<IPaginateCompanie> {
    const companiesRepository = getCustomRepository(CompanieRepository);

    const companies = await companiesRepository.createQueryBuilder().paginate();

    return companies as IPaginateCompanie;
  }
}

export default ListCompanieService;
