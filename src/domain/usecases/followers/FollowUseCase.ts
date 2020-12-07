import { ShoppingBasketResponse, User } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { FollowRequest } from '../../commands';

export class FollowUseCase implements IUseCase<string> {
  constructor(private userRepository: IRepository<User>) {}

  async execute(
    followRequest: FollowRequest
  ): Promise<ShoppingBasketResponse<string>> {
    try {
      //Found if this short id exists in our db
      const [avaliableFollower] = await this.userRepository.findMany({
        publicId: followRequest.publicId,
      });

      if (!avaliableFollower) {
        throw new Error('No user with this short id exists in our database');
      }

      const [user]: User[] = await this.userRepository.findMany({
        relations: ['followers'],
        where: { id: followRequest.currentUserId },
      });

      const existingFollower = user
        .getFollowers()
        ?.find((follower) => follower.getPublicId() === followRequest.publicId);

      if (existingFollower) {
        throw new Error(`${avaliableFollower.getUsername()} y tu ya sois amigos`);
      }

      user.setFollowers([avaliableFollower]);
      await this.userRepository.save(user);

      return new ShoppingBasketResponse<string>([
        `${avaliableFollower.getUsername()} y tu ahora sois amigos`,
      ]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
