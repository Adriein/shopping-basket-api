import { Response } from '../entities/Response';

export interface UseCase<T> {
  execute(...args: any[]): Promise<Response<T>>;
}
