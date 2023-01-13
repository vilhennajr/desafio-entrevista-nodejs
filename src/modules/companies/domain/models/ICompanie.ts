export interface ICompanie {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  parking_spaces_motorcycles: number;
  parking_spaces_cars: number;
  created_at: Date;
  updated_at: Date;
}
