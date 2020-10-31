import { ProductStatus } from '../entities/ProductStatus';

export interface IProductInList {
  id: string;
  productId: string;
  name: string;
  supermarket: string;
  img: string;
  quantity: number;
  status: ProductStatus;
  userInCharge?: string;
}
