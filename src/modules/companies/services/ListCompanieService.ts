import { inject, injectable } from 'tsyringe';
import { ICompaniesRepository } from '../domain/repositories/ICompaniesRepository';
import { ICompaniePaginate } from '../domain/models/ICompaniePaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListCompanieService {

  constructor(

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository

  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<ICompaniePaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const companies = await this.companiesRepository.findAll({
      page,
      skip,
      take,
    });

    return companies;
  }
}

export default ListCompanieService;
