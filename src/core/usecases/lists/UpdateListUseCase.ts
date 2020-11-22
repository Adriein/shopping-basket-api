import { List, ShoppingBasketResponse } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { UpdateListRequest } from '../../request/UpdateListRequest';

export class UpdateListUseCase implements IUseCase<string> {
  constructor(private repository: IRepository<List>) {}

  async execute(
    request: UpdateListRequest
  ): Promise<ShoppingBasketResponse<string>> {
    try {
      const { id, title, users, products, status } = request;

      const list = new List(id, title, users, status, new Date(), products);

      await this.repository.update(list.getId(), list);

      return new ShoppingBasketResponse(['List updated']);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
