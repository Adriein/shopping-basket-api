import { Result, Repository, UseCase, Group } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class GetAllGroupsUseCase implements UseCase<Group> {
  constructor(private repository: Repository<Group>) {}

  async execute(): Promise<Result<Group>> {
    try {
      return new Result<Group>(await this.repository.findMany({}));
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
