import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanieService from '../../../services/CreateCompanieService';
import DeleteCompanieService from '../../../services/DeleteCompanieService';
import ListCompanieService from '../../../services/ListCompanieService';
import ShowCompanieService from '../../../services/ShowCompanieService';
import UpdateCompanieService from '../../../services/UpdateCompanieService';

export default class CompaniesController {
  public async index(request: Request, response: Response): Promise<Response> {

    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listCompanies = container.resolve(ListCompanieService);
    const companies = await listCompanies.execute({ page, limit });

    return response.json(companies);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showCompanie = container.resolve(ShowCompanieService);

    const companie = await showCompanie.execute({ id });

    return response.json(companie);

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cnpj,
      address,
      phone,
      parking_spaces_motorcycles,
      parking_spaces_cars,
    } = request.body;

    const createCompanie = container.resolve(CreateCompanieService);

    const companie = await createCompanie.execute({
      name,
      cnpj,
      address,
      phone,
      parking_spaces_motorcycles,
      parking_spaces_cars,
    });

    return response.json(companie);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cnpj,
      address,
      phone,
      parking_spaces_motorcycles,
      parking_spaces_cars,
    } = request.body;
    const { id } = request.params;

    const updateCompanie = container.resolve(UpdateCompanieService);

    const companie = await updateCompanie.execute({
      id,
      name,
      cnpj,
      address,
      phone,
      parking_spaces_motorcycles,
      parking_spaces_cars,
    });

    return response.json(companie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCompanie = container.resolve(DeleteCompanieService);

    await deleteCompanie.execute({ id });

    return response.json([]);
  }
}
