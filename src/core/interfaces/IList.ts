import { ListStatus } from '../entities/ListStatus';
import { IProductInList } from './IProductInList';
import { IUser } from './IUser';

export interface IList {
  id?: string;
  title: string;
  users: IUser[];
  status: ListStatus;
  creation?: Date;
  products?: IProductInList[];
}
