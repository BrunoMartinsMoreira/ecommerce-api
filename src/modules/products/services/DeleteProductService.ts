import { RedisCache } from '@shared/cache/RedisCache';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface Irequest {
  id: string;
}

export class DeleteProductsService {
  public async execute({ id }: Irequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}
