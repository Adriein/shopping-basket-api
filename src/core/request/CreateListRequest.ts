import { Product, User } from '../entities';

export type CreateListRequest = {
  title: string;
  users: User[];
  products: Product[];
};
