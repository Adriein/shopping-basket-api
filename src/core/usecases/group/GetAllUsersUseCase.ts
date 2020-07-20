import { Result, Repository, UseCase, User } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';
import { maskFields } from '../../helpers';

export class GetAllUsersUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(currentUser: User): Promise<Result<User>> {
    try {
      const allUsers = await this.repository.findMany({});

      const result = allUsers.filter((user) => {
        user = maskFields(user, ['password']);
        if (user.id!.toString() !== currentUser.id!.toString()) return user;
      });

      return new Result<User>(result);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
