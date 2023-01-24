import { ICompaniePaginate } from '@modules/companies/domain/models/ICompaniePaginate';
import { ICreateCompanie } from '@modules/companies/domain/models/ICreateCompanie';
import { ICompaniesRepository } from '@modules/companies/domain/repositories/ICompaniesRepository';
import { Repository } from 'typeorm';
import Companie from '../entities/Companie';
import { SearchParams } from '../../../domain/repositories/ICompaniesRepository';
import { dataSource } from '@shared/infra/typeorm';

class CompanieRepository implements ICompaniesRepository {

  private ormRepository: Repository<Companie>

  constructor() {
    this.ormRepository = dataSource.getRepository(Companie);
  }

  public async create({ name, cnpj, address, phone, parking_spaces_motorcycles, parking_spaces_cars }: ICreateCompanie): Promise<Companie> {

    const companie = this.ormRepository.create({ name, cnpj, address, phone, parking_spaces_motorcycles, parking_spaces_cars });

    await this.ormRepository.save(companie);

    return companie;

  }

  public async save(companie: Companie): Promise<Companie> {

    await this.ormRepository.save(companie);

    return companie;

  }

  public async findByCnpj(cnpj: string): Promise<Companie | null> {
    const companie = this.ormRepository.findOneBy({ cnpj });
    return companie;
  }

  public async findById(id: string): Promise<Companie | null> {
    const companie = this.ormRepository.findOneBy({ id: Number(id) });
    return companie;
  }

  public async remove(companie: Companie): Promise<void> {
    await this.ormRepository.remove(companie);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICompaniePaginate> {
    const [
      companies,
      count,
    ] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: companies,
    };

    return result;
  }

}

export default CompanieRepository;
