import { Response, Product } from '../../entities';
import { IUseCase, IRepository, IScrapper, IProduct } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class PopulateDatabaseUseCase implements IUseCase<string> {
  constructor(
    private repository: IRepository<IProduct>,
    private scrapper: IScrapper
  ) {}

  async execute(): Promise<Response<string>> {
    try {
      //Scrap open foods DB
      const products: Product[] = await this.scrapper.scrap();

      //If the product is in the list and not in the db --insert
      for (const product of products) {
        await this.repository.save(product);
      }
      //Resturn result of the cron
      return new Response([`${products.length} have been inserted in to DB`]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
