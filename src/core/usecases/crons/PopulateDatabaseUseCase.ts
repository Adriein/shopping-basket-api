import { ShoppingBasketResponse, Product } from '../../entities';
import { IUseCase, IRepository, IScrapper } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class PopulateDatabaseUseCase implements IUseCase<number> {
  constructor(
    private repository: IRepository<Product>,
    private scrapper: IScrapper
  ) {}

  async execute(): Promise<ShoppingBasketResponse<number>> {
    try {
      //Scrap open foods DB
      const products: Product[] = await this.scrapper.scrap();

      //If the product is in the list and not in the db --insert
      for (const product of products) {
        await this.repository.save(product);
      }
      //Resturn result of the cron
      return new ShoppingBasketResponse([products.length]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
