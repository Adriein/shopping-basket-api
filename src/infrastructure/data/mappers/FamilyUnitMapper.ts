import { FamilyUnit } from '../../../core/entities';
import { FamilyUnitDoc } from '../schemas';

export class FamilyUnitMapper {
  familyUnitSchemaToDomainFamilyUnit({
    _id,
    users,
    creationDate,
  }: FamilyUnitDoc): FamilyUnit {
    return { id: _id, users, creationDate } as FamilyUnit;
  }
}
