import { RedisCache } from '@shared/cache/RedisCache';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface Irequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async execute({ id, name, price, quantity }: Irequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

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
