import { Repository, FamilyUnit } from '../../core/entities';
import { FamilyUnitModel } from '../data/schemas';
import { FamilyUnitMapper } from '../data/mappers';

export class FamilyUnitRepository implements Repository<FamilyUnit> {
  private mapper: FamilyUnitMapper;

  constructor() {
    this.mapper = new FamilyUnitMapper();
  }

  async findMany(searchObj: any): Promise<FamilyUnit[]> {
    const [familyUnit] = await FamilyUnitModel.find(searchObj).exec();
    if (!familyUnit) return [{} as FamilyUnit];
    return [this.mapper.familyUnitSchemaToDomainFamilyUnit(familyUnit)];
  }

  async findOne(id: string): Promise<FamilyUnit> {
    const response = await FamilyUnitModel.findOne({
      username: id,
    }).exec();
    if (response !== null)
      return this.mapper.familyUnitSchemaToDomainFamilyUnit(response);
    return {} as FamilyUnit;
  }

  async save(body: FamilyUnit): Promise<FamilyUnit> {
    return this.mapper.familyUnitSchemaToDomainFamilyUnit(
      await new FamilyUnitModel(body).save()
    );
  }

  async update(id: string, body: FamilyUnit): Promise<FamilyUnit> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
