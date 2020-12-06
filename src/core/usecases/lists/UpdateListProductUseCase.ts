import { List, Product, ShoppingBasketResponse } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { UpdateListProductRequest } from '../../request';

export class UpdateListProductUseCase implements IUseCase<string> {
  constructor(private repository: IRepository<Product>) {}

  async execute(
    request: UpdateListProductRequest
  ): Promise<ShoppingBasketResponse<string>> {
    try {
      const { product } = request;

      await this.repository.update(
        product.getListId(),
        product.getId(),
        product
      );

      return new ShoppingBasketResponse(['List updated']);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
