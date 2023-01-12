import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Companie from '../typeorm/entities/Companie';
import CompanieRepository from '../typeorm/repositories/CompaniesRepository';

interface IRequest {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  parking_spaces_motorcycles: number;
  parking_spaces_cars: number;
}

class CreateCompanieService {
  public async execute({
    name,
    cnpj,
    address,
    phone,
    parking_spaces_motorcycles,
    parking_spaces_cars,
  }: IRequest): Promise<Companie> {
    const companiesRepository = getCustomRepository(CompanieRepository);
    const companieExists = await companiesRepository.findByCnpj(cnpj);

    if (companieExists) {
      throw new AppError('There is already one companie with this cnpj');
    }

    const companie = await companiesRepository.create({
      name,
      cnpj,
      address,
      phone,
      parking_spaces_motorcycles,
      parking_spaces_cars,
    });

    await companiesRepository.save(companie);

    return companie;
  }
}

export default CreateCompanieService;
