import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Order } from '../infra/typeorm/entities/Order';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Customer not exists');
    }

    // checa se todos os produtos enviados  existem
    const existsAllProducts = await productsRepository.findAllByIds(products);

    if (!existsAllProducts.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    // checar se algum produto enviado nao existe
    const existSomeProductsIds = existsAllProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existSomeProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
    }

    // checa se existe quantidade suficiente do produto
    const quantityAvailable = products.filter(
      productSentByCustomer =>
        existsAllProducts.filter(
          existingProduct => existingProduct.id === productSentByCustomer.id,
        )[0].quantity < productSentByCustomer.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsAllProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsAllProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
