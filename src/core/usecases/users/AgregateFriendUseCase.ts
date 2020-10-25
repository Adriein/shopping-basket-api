import { Response } from '../../entities';
import { IUseCase, IRepository, IUser, IUserToFriend } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class AgregateFriendUseCase implements IUseCase<string> {
  constructor(
    private repository: IRepository<IUser>,
    private userToFriendRepository: IRepository<IUserToFriend>
  ) {}

  async execute(body: any, currentUserId: string): Promise<Response<string>> {
    try {
      //Found if this short id exists in our db
      const [friend] = await this.repository.findMany({
        publicId: body.publicId,
      });

      if (!friend) {
        throw new Error('No user with this short id exists in our database');
      }

      //Agregate the friend, may throw an error if you already have the friend
      const [friendship] = await this.userToFriendRepository.findMany({
        userId1: currentUserId,
        userId2: friend.id,
      });

      if (friendship) {
        throw new Error('You already have this friend');
      }

      await this.userToFriendRepository.save({
        userId1: currentUserId,
        userId2: friend.id,
      });

      return new Response<string>(['Friend aggregated']);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
