import { ShoppingBasketResponse, User } from '../../entities';
import { NotAuthorizedError, CustomError, UnExpectedError } from '../../errors';
import { isEmpty, compare } from '../../helpers';
import { IRepository, IUseCase } from '../../interfaces';
import { SigninRequest } from '../../request/SigninRequest';

export class SignInUseCase implements IUseCase<User> {
  constructor(private repository: IRepository<User>) {}

  async execute(body: SigninRequest): Promise<ShoppingBasketResponse<User>> {
    try {
      const { username, password } = body;

      //Check if the user exists
      const [userOnDB] = await this.repository.findMany({ username });

      if (isEmpty(userOnDB)) throw new NotAuthorizedError();

      //Compare the password
      if (!(await compare(userOnDB.getPassword(), password!)))
        throw new NotAuthorizedError();

      return new ShoppingBasketResponse<User>([userOnDB]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
