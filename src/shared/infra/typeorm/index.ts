import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Company from '@modules/companies/infra/typeorm/entities/Companie';
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

import { CreateCompanies1673548773772 } from './migrations/1673548773772-CreateCompanies';
import { CreateUsers1673552480543 } from './migrations/1673552480543-CreateUsers';
import { CreateVehicles1673626120697 } from './migrations/1673626120697-CreateVehicles';
import { AddCompanieIdToVehicles1673626753719 } from './migrations/1673626753719-AddCompanieIdToVehicles';

export const dataSource = new DataSource({
  type: 'mysql',
  host: '172.17.0.2',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'drconsulta-vehicle-parking',
  entities: [User, Company, Vehicle],
  migrations: [
    CreateCompanies1673548773772,
    CreateUsers1673552480543,
    CreateVehicles1673626120697,
    AddCompanieIdToVehicles1673626753719,
  ],
});
