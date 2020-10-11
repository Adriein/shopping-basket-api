import { ProductStatus } from './ProductStatus';
import { User } from './User';

export interface Product {
  name: string;
  img: string;
  supermarket: string;
  status: ProductStatus;
  userInCharge: User;
  quantity: number;
}
