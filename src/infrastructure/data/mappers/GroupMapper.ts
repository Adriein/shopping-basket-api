import { Group } from '../../../core/entities';
import { GroupDoc } from '../schemas';

export class GroupMapper {
  familyUnitSchemaToDomainGroup({
    _id,
    owner,
    users,
    creationDate,
  }: GroupDoc): Group {
    return { id: _id, users, owner, creationDate } as Group;
  }
}
