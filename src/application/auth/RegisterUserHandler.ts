import { User, ShoppingBasketResponse } from '../../domain/entities';
import { IUseCase, IRepository, IHandler, ICommand } from '../../domain/interfaces';
import { CustomError, UnExpectedError } from '../../domain/errors';
import { isEmpty } from '../../domain/helpers';
import { RegisterUserCommand } from '../../domain/commands';

export class RegisterUserHandler implements IHandler<User> {
  constructor(private repository: IRepository<User>) {}

  async handle(
    command: ICommand
  ): Promise<User> {
    try {
      const { username, password } = command as RegisterUserCommand;

      //Check if the user already exists
      const [userOnDB] = await this.repository.find({ username });

      if (userOnDB && !isEmpty(userOnDB))
        throw new Error('User already exists in DB');

      const user = User.create(username, password);

      //Hash the password
      user.hashPassword();
      await this.repository.findOne(user.getId());

      return await this.repository.save(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
