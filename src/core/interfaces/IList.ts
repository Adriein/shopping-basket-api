import { ListStatus } from '../entities/ListStatus';
import { IProductInList } from './IProductInList';

export interface IList {
  id?: string;
  title: string;
  users: string[];
  status: ListStatus;
  creation?: Date;
  products?: IProductInList[];
}
