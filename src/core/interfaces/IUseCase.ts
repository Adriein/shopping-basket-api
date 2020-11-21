import { ShoppingBasketResponse } from '../entities/ShoppingBasketResponse';

export interface IUseCase<T> {
  execute(...args: any[]): Promise<ShoppingBasketResponse<T>>;
}
