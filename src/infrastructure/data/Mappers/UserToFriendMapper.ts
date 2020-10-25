import { IUserToFriend, IMapper } from '../../../core/interfaces';
import { UserToFriend as UserToFriendDto } from '../DTO/UserToFriend.dto';

export class UserToFriendMapper implements IMapper<IUserToFriend> {
  public toDomainEntity(userToFriend: UserToFriendDto[]): IUserToFriend[] {
    return userToFriend.map((userToFriendDto) => {
      return {
        id: userToFriendDto.id,
        userId1: userToFriendDto.userId1,
        userId2: userToFriendDto.userId2,
      };
    });
  }

  public toDto(product: IUserToFriend): any{
    throw new Error();
  } 
}
