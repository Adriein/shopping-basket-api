import { Product, ShoppingBasketResponse } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { Like } from 'typeorm';
import { GetProductRequest } from '../../commands';

export class GetProductsUseCase implements IUseCase<Product> {
  constructor(private repository: IRepository<Product>) {}

  async execute(pagination?: any): Promise<ShoppingBasketResponse<Product>> {
    try {
      if (
        pagination &&
        pagination.page &&
        pagination.limit &&
        pagination.search
      ) {
        const products: Product[] = await this.repository.findMany({
          where: { name: Like(`%${pagination.search}%`) },
          skip: parseInt(pagination.page) * parseInt(pagination.limit),
          take: parseInt(pagination.limit),
        });

        return new ShoppingBasketResponse<Product>(products);
      }
      const products: Product[] = await this.repository.findMany({});
      //SELECT * FROM product LIMIT 1000 OFFSET 1100;
      return new ShoppingBasketResponse<Product>(products);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
