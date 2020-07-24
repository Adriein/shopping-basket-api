import { User } from './User';

export interface Basket {
  id: string;
  owner: string;
  users: User[];
  creationDate: Date;
}
