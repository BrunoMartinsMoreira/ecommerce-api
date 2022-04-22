import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

export class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.find();

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}
