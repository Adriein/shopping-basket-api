import { Mapper, User } from '../../../core/entities';
import { User as UserDto } from '../DTO/User.dto';

export class UserMapper implements Mapper<User> {
  public toDomainEntity(users: UserDto[]): User[] {
    return users.map((userDto) => {
      return new User(
        userDto.username!,
        userDto.password!,
        userDto.id,
        userDto.publicId,
        userDto.creation
      );
    });
  }
}
