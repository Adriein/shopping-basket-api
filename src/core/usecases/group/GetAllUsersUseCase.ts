import { Result, Repository, UseCase, User } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class GetAllUsersUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(currentUser: User): Promise<Result<User>> {
    try {
      const allUsers = await this.repository.findMany({});
      return new Result<User>(
        allUsers.filter((user) => user.id !== currentUser.id)
      );
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
