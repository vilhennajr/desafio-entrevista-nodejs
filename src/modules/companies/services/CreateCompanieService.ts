import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICompanie } from '../domain/models/ICompanie';
import { ICreateCompanie } from '../domain/models/ICreateCompanie';
import { ICompaniesRepository } from '../domain/repositories/ICompaniesRepository';

@injectable()
class CreateCompanieService {

  constructor(

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository

  ) {}

  public async execute({
    name,
    cnpj,
    address,
    phone,
    parking_spaces_motorcycles,
    parking_spaces_cars,
  }: ICreateCompanie): Promise<ICompanie> {
    const companieExists = await this.companiesRepository.findByCnpj(cnpj);

    if (companieExists) {
      throw new AppError('There is already one companie with this cnpj');
    }

    const companie = await this.companiesRepository.create({
      name,
      cnpj,
      address,
      phone,
      parking_spaces_motorcycles,
      parking_spaces_cars,
    });

    return companie;
  }
}

export default CreateCompanieService;
