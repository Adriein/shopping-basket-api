import { Response } from '../../entities';
import { IUseCase, IRepository, IProduct } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { Like } from 'typeorm';

export class GetProductsUseCase implements IUseCase<IProduct> {
  constructor(private repository: IRepository<IProduct>) {}

  async execute(pagination?: any): Promise<Response<IProduct>> {
    try {
      if (
        pagination &&
        pagination.page &&
        pagination.limit &&
        pagination.search
      ) {
        const products: IProduct[] = await this.repository.findMany({
          where: { name: Like(`%${pagination.search}%`) },
          skip: parseInt(pagination.page) * parseInt(pagination.limit),
          take: parseInt(pagination.limit),
        });

        return new Response<IProduct>(products);
      }
      const products: IProduct[] = await this.repository.findMany({});
      //SELECT * FROM product LIMIT 1000 OFFSET 1100;
      return new Response<IProduct>(products);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
