import { User, ShoppingBasketResponse } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { isEmpty } from '../../helpers';
import { CreateUserRequest } from '../../request';

export class RegisterUseCase implements IUseCase<User> {
  constructor(private repository: IRepository<User>) {}

  async execute(
    request: CreateUserRequest
  ): Promise<ShoppingBasketResponse<User>> {
    try {
      const { username, password } = request;

      //Check if the user already exists
      const [userOnDB] = await this.repository.findMany({ username });

      if (userOnDB && !isEmpty(userOnDB))
        throw new Error('User already exists in DB');

      const user = User.create(username, password);

      //Hash the password
      user.hashPassword();

      const createdUser = await this.repository.save(user);

      return new ShoppingBasketResponse<User>([createdUser]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
