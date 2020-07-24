import { Result, Repository, UseCase, Basket, User } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class GetAllRelatedBasketsUseCase implements UseCase<Basket> {
  constructor(private repository: Repository<Basket>) {}

  async execute(currentUser: User): Promise<Result<Basket>> {
    try {
      //We get all baskets
      const baskets = await this.repository.findMany({});

      //Filter all baskets to remove those where the user who is making the request is not into
      const filteredBaskets = baskets.filter((basket) => {
        if (
          basket.owner === currentUser.id ||
          basket.users.some((user) => {
            return user.id!.toString() === currentUser.id!.toString();
          })
        )
          return basket;
      });

      return new Result<Basket>(filteredBaskets);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
