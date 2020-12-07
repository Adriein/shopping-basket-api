import { User } from '../../../domain/entities';
import { IMapper } from '../../../domain/interfaces';
import { User as UserDto } from '../DTO/User.dto';

export class UserMapper implements IMapper<User> {
  public toDomainEntity(users: UserDto[]): User[] {
    return users.map((userDto) => {
      return new User(
        userDto.id!,
        userDto.username!,
        userDto.password!,
        userDto.publicId!,
        userDto.creation!,
        userDto.followers ? this.toDomainEntity(userDto.followers!) : undefined
      );
    });
  }

  public toDto(product: User): any {
    throw new Error();
  }
}
