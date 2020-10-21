import { Response } from '../../entities';
import { IUseCase, IRepository, IScrapper, IProduct } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class GetProductsUseCase implements IUseCase<IProduct> {
  constructor(private repository: IRepository<IProduct>) {}

  async execute(): Promise<Response<IProduct>> {
    try {
      const products: IProduct[] = await this.repository.findMany({});

      return new Response<IProduct>(products);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
