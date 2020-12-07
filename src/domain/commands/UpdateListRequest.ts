import { Product, User } from '../entities';
import { ListEnum } from '../enums/ListEnum';

export type UpdateListRequest = {
  id: string;
  title: string;
  status: ListEnum;
  users: User[];
  products: Product[];
};
