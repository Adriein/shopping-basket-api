import { Repository, Basket } from '../../core/entities';
import { GroupModel } from '../data/schemas';
import { BasketMapper } from '../data/mappers';

export class BasketRepository implements Repository<Basket> {
  private mapper: BasketMapper;

  constructor() {
    this.mapper = new BasketMapper();
  }

  async findMany(searchObj: any): Promise<Basket[]> {
    const familyUnit = await GroupModel.find(searchObj).exec();
    if (familyUnit.length === 0) return [];
    return await this.mapper.groupsSchemasToDomainGroups(familyUnit);
  }

  async findOne(id: string): Promise<Basket> {
    const response = await GroupModel.findOne({
      username: id,
    }).exec();
    if (response !== null)
      return await this.mapper.groupSchemaToDomainGroup(response);
    return {} as Basket;
  }

  async save(body: Basket): Promise<Basket> {
    return await this.mapper.groupSchemaToDomainGroup(
      await new GroupModel(body).save()
    );
  }

  async update(id: string, body: Basket): Promise<Basket> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
