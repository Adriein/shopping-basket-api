import { Response } from '../../entities';
import { IUseCase, IRepository, IUser, IUserToFriend } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { maskFields } from '../../helpers';

export class GetFriendsUseCase implements IUseCase<IUser> {
  constructor(private userToFriendRepository: IRepository<IUserToFriend>) {}

  async execute(currentUserId: string): Promise<Response<IUser>> {
    try {
      //Find all friends for this user
      const friends = await this.userToFriendRepository.findMany({
        relations: ['userId2'],
        where: { userId1: currentUserId },
      });
      //Mask dangerous fields like password etc...
      const response = friends.map((userToFriend: IUserToFriend) => {
        const friend = userToFriend.userId2 as IUser;
        return maskFields(friend, [
          'password',
          'publicId',
          'creation',
        ]) as IUser;
      });

      return new Response<IUser>(response);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
