import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { RedisCache } from '@shared/cache/RedisCache';
import { Product } from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

export class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    // antes de fazer a consulta instancia a classe rediscache
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!products) {
      products = await productsRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    if (!products.length) {
      throw new AppError('No registered products found');
    }

    return products;
  }
}
