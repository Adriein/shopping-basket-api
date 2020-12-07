import { List, User, ShoppingBasketResponse } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { ListEnum } from '../../enums/ListEnum';
import { CreateListRequest } from '../../commands';

export class CreateListUseCase implements IUseCase<string> {
  constructor(
    private listRepository: IRepository<List>,
    private usersRepository: IRepository<User>
  ) {}

  async execute(
    createListRequest: CreateListRequest,
    ownerId: string
  ): Promise<ShoppingBasketResponse<string>> {
    try {
      const { title, users, products } = createListRequest;

      const owner = await this.usersRepository.findOne(ownerId);

      const list = List.create(
        title,
        [owner, ...users],
        ListEnum.IN_CONSTRUCTION,
        products
      );

      await this.listRepository.save(list);

      return new ShoppingBasketResponse(['List created']);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
