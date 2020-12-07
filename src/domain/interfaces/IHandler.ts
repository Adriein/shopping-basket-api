import { ICommand } from './ICommand';

export interface IHandler<T> {
  handle(command: ICommand): Promise<T>;
}
