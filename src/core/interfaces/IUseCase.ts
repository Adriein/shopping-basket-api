import { Response } from '../entities/Response';

export interface IUseCase<T> {
  execute(...args: any[]): Promise<Response<T>>;
}
