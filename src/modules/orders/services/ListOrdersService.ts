import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Order } from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

export class ListOrdersService {
  public async execute(): Promise<Order[]> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const orders = await ordersRepository.find();

    if (!orders) {
      throw new AppError('Orders not found');
    }

    return orders;
  }
}
