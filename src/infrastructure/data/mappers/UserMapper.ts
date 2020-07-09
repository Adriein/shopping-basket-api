import { User } from '../../../core/entities';
import { UserDoc } from '../schemas/UserSchema';

export class UserMapper {
  userSchemaToDomainUser({ _id, username, password }: UserDoc): User {
    return { id: _id, username, password } as User;
  }
}
