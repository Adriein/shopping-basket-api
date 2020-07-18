import { Repository, Group } from '../../core/entities';
import { GroupModel } from '../data/schemas';
import { GroupMapper } from '../data/mappers';

export class GroupRepository implements Repository<Group> {
  private mapper: GroupMapper;

  constructor() {
    this.mapper = new GroupMapper();
  }

  async findMany(searchObj: any): Promise<Group[]> {
    const [familyUnit] = await GroupModel.find(searchObj).exec();
    if (!familyUnit) return [];
    return [this.mapper.familyUnitSchemaToDomainGroup(familyUnit)];
  }

  async findOne(id: string): Promise<Group> {
    const response = await GroupModel.findOne({
      username: id,
    }).exec();
    if (response !== null)
      return this.mapper.familyUnitSchemaToDomainGroup(response);
    return {} as Group;
  }

  async save(body: Group): Promise<Group> {
    return this.mapper.familyUnitSchemaToDomainGroup(
      await new GroupModel(body).save()
    );
  }

  async update(id: string, body: Group): Promise<Group> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}