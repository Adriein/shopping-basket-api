import { Result, Repository, UseCase, Group, User } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class GetAllGroupsUseCase implements UseCase<Group> {
  constructor(private repository: Repository<Group>) {}

  async execute(currentUser: User): Promise<Result<Group>> {
    try {
      //We get all groups
      const groups = await this.repository.findMany({});

      //Filter all groups to remove those where the user who is making the request is not into
      const filteredGroups = groups.filter((group) => {
        if (
          group.owner === currentUser.id ||
          group.users.some((user) => user.id === currentUser.id)
        )
          return group;
      });

      return new Result<Group>(filteredGroups);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
