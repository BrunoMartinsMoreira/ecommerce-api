import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class DeleteCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== customer.id) {
      throw new AppError('This email is already in use');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
