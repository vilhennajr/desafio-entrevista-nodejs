import { EntityRepository, Repository } from 'typeorm';
import Companie from '../entities/Companie';

@EntityRepository(Companie)
class CompanieRepository extends Repository<Companie> {
  public async findByCnpj(cnpj: string): Promise<Companie | undefined> {
    const companie = this.findOne({
      where: {
        cnpj,
      },
    });
    return companie;
  }
}

export default CompanieRepository;
