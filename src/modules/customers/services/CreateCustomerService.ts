/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { AppError } from '@shared/errors/AppError';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

export class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('This email is already in use');
    }

    const customer = await this.customersRepository.create({ name, email });

    return customer;
  }
}
