import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Companie from '../typeorm/entities/Companie';
import CompanieRepository from '../typeorm/repositories/CompaniesRepository';

interface IRequest {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  parking_spaces_motorcycles: number;
  parking_spaces_cars: number;
}

class UpdateCompanieService {
  public async execute({
    id,
    name,
    address,
    phone,
    parking_spaces_motorcycles,
    parking_spaces_cars,
  }: IRequest): Promise<Companie> {
    const companiesRepository = getCustomRepository(CompanieRepository);

    const companie = await companiesRepository.findOne(id);

    if (!companie) {
      throw new AppError('Companie not found.');
    }

    companie.name = name;
    companie.address = address;
    companie.phone = phone;
    companie.parking_spaces_motorcycles = parking_spaces_motorcycles;
    companie.parking_spaces_cars = parking_spaces_cars;

    await companiesRepository.save(companie);

    return companie;
  }
}

export default UpdateCompanieService;
