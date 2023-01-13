import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateCompanie } from '../domain/models/IUpdateCompanie';
import Companie from '../infra/typeorm/entities/Companie';
import { ICompaniesRepository } from '../domain/repositories/ICompaniesRepository';

@injectable()
class UpdateCompanieService {

  constructor(

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository

  ) {}

  public async execute({
    id,
    name,
    address,
    phone,
    parking_spaces_motorcycles,
    parking_spaces_cars,
  }: IUpdateCompanie): Promise<Companie> {
    const companie = await this.companiesRepository.findById(id);

    if (!companie) {
      throw new AppError('Companie not found.');
    }

    companie.name = name;
    companie.address = address;
    companie.phone = phone;
    companie.parking_spaces_motorcycles = parking_spaces_motorcycles;
    companie.parking_spaces_cars = parking_spaces_cars;

    await this.companiesRepository.save(companie);

    return companie;
  }
}

export default UpdateCompanieService;
