import { IUser, Mapper } from '../../../core/interfaces';
import { User as UserDto } from '../DTO/User.dto';

export class UserMapper implements Mapper<IUser> {
  public toDomainEntity(users: UserDto[]): IUser[] {
    return users.map((userDto) => {
      return {
        username: userDto.username!,
        password: userDto.password!,
        id: userDto.id!,
        publicId: userDto.publicId!,
        creation: userDto.creation!,
      };
    });
  }
}
