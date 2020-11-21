import { ShoppingBasketResponse, User } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { maskFields } from '../../helpers';

export class GetFollowersUseCase implements IUseCase<User> {
  constructor(private userRepository: IRepository<User>) {}

  async execute(currentUserId: string): Promise<ShoppingBasketResponse<User>> {
    try {
      //Find all friends for this user
      const [user]: User[] = await this.userRepository.findMany({
        relations: ['followers'],
        where: { id: currentUserId },
      });
      
      //Mask dangerous fields like password etc...
      const response = user
        .getFollowers()
        ?.map(
          (follower: User) =>
            maskFields(follower, ['password', 'publicId', 'creation']) as User
        );

      return new ShoppingBasketResponse<User>(response!);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
