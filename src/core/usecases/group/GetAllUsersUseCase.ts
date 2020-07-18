import { Result, Repository, UseCase, User } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class GetAllUsersUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(): Promise<Result<User>> {
    try {
      return new Result<User>(await this.repository.findMany({}));
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
