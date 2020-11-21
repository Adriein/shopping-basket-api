import { ShoppingBasketResponse, List } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class GetListUseCase implements IUseCase<List> {
  constructor(private repository: IRepository<List>) {}

  async execute(id?: string): Promise<ShoppingBasketResponse<List>> {
    try {
      if (id) {
        const list = await this.repository.findMany({
          relations: ['users', 'products'],
          where: { id },
        });
        return new ShoppingBasketResponse(list);
      }

      const lists = await this.repository.findMany({
        relations: ['users', 'products'],
      });
      
      return new ShoppingBasketResponse(lists);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
