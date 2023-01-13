import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteCompanie } from '../domain/models/IDeleteCompanie';
import { ICompaniesRepository } from '../domain/repositories/ICompaniesRepository';

@injectable()
class DeleteCompanieService {

  constructor(

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository

  ) {}

  public async execute({ id }: IDeleteCompanie): Promise<void> {
    const companie = await this.companiesRepository.findById(id);

    if (!companie) {
      throw new AppError('Companie not found.');
    }

    await this.companiesRepository.remove(companie);
  }
}

export default DeleteCompanieService;
