import { Response } from './Response';

export interface UseCase<T> {
  execute(...args: any[]): Promise<Response<T>>;
}
