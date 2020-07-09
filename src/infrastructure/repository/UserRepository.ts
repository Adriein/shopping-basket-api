import { User, Repository } from '../../core/entities';
import { UserModel } from '../data/schemas';
import { UserMapper } from '../data/mappers/UserMapper';

export class UserRepository implements Repository<User> {
  private mapper: UserMapper;

  constructor() {
    this.mapper = new UserMapper();
  }

  async findMany(searchObj: any): Promise<User[]> {
    const [user] = await UserModel.find(searchObj).exec();
    if (!user) return [{}];
    return [this.mapper.userSchemaToDomainUser(user)];
  }

  async findOne(id: string): Promise<User> {
    const response = await UserModel.findOne({
      username: id,
    }).exec();
    if (response !== null) return this.mapper.userSchemaToDomainUser(response);
    return {};
  }

  async save(body: User): Promise<User> {
    return this.mapper.userSchemaToDomainUser(await new UserModel(body).save());
  }

  async update(id: string, body: User): Promise<User> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
