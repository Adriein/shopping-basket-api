import { User } from '../../domain/entities';
import { isEmpty } from '../../domain/helpers';
import { ICommand, IHandler, IRepository } from '../../domain/interfaces';
import { SigninCommand } from '../../domain/commands';
import {
  NotAuthorizedError,
  CustomError,
  UnExpectedError,
} from '../../domain/errors';

export class SigninHandler implements IHandler<User> {
  constructor(private repository: IRepository<User>) {}

  async handle(command: ICommand): Promise<User> {
    try {
      const { username, password } = command as SigninCommand;

      //Check if the user exists
      const [userOnDB] = await this.repository.find({ username });

      if (isEmpty(userOnDB)) throw new NotAuthorizedError();

      //Compare the password
      if (!(await userOnDB.isCorrectPassword(userOnDB.getPassword(), password)))
        throw new NotAuthorizedError();

      return userOnDB;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
