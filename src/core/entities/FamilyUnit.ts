import { User } from './User';

export interface FamilyUnit {
  id: string;
  users: User[];
  creationDate: Date;
}
