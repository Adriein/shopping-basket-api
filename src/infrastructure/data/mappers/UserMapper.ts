import { User } from '../../../core/entities';
import { UserDoc } from '../schemas/UserSchema';

export class UserMapper {
  userSchemaToDomainUser({ _id, username, password }: UserDoc): User {
    return { id: _id, username, password } as User;
  }

  usersSchemaToDomainUsers(users: UserDoc[]): User[] {
    return users.map((user) => {
      return {
        id: user._id,
        username: user.username,
        password: user.password,
      } as User;
    });
  }
}
