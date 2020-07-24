import { Basket, User, Repository } from '../../../core/entities';
import { GroupDoc } from '../schemas';
import { UserRepository } from '../../repository';

export class BasketMapper {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async groupSchemaToDomainGroup({
    _id,
    owner,
    users,
    creationDate,
  }: GroupDoc): Promise<Basket> {
    return {
      id: _id,
      users: await this.buildUsersArray(users),
      owner,
      creationDate,
    } as Basket;
  }

  async groupsSchemasToDomainGroups(groups: GroupDoc[]): Promise<Basket[]> {
    return (await Promise.all(
      groups.map(async (group) => {
        return {
          id: group._id,
          owner: group.owner,
          users: await this.buildUsersArray(group.users),
          creationDate: group.creationDate,
        };
      })
    )) as Basket[];
  }

  async buildUsersArray(userIds: string[]): Promise<User[]> {
    return await Promise.all(
      userIds.map(async (id) => {
        const [user] = await this.userRepository.findMany({ _id: id });
        return {
          id: user.id!,
          username: user.username!,
        };
      }) as User[]
    );
  }
}
