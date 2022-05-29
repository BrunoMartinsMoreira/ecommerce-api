import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('This email is already in use');
    }

    const customer = customersRepository.create({ name, email });
    await customersRepository.save(customer);

    return customer;
  }
}
