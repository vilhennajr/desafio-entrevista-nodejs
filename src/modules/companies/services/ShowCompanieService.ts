import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Companie from '../infra/typeorm/entities/Companie';
import { IShowCompanie } from '../domain/models/IShowCompanie';
import { ICompaniesRepository } from '../domain/repositories/ICompaniesRepository';

@injectable()
class ShowCompanieService {

  constructor(

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository

  ) {}

  public async execute({ id }: IShowCompanie): Promise<Companie> {
    const companie = await this.companiesRepository.findById(id);

    if (!companie) {
      throw new AppError('Companie not found.');
    }

    return companie;
  }
}

export default ShowCompanieService;
