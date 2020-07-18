import { User } from './User';

export interface Group {
  id: string;
  owner: string;
  users: User[];
  creationDate: Date;
}
