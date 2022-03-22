import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface Irequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductsService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: Irequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await productsRepository.findByName(name);
    if (productExists && name !== product.name) {
      throw new AppError('This product is already registered.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    const updatedProduct = await productsRepository.save(product);
    return updatedProduct;
  }
}
