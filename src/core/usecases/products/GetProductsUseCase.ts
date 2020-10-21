import { Response, Product } from '../../entities';
import { IUseCase, IRepository, IScrapper, IProduct } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class GetProductsUseCase implements IUseCase<IProduct> {
  constructor(
    private repository: IRepository<IProduct>,
    private scrapper: IScrapper
  ) {}

  async execute(): Promise<Response<IProduct>> {
    try {
      throw new Error();
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
