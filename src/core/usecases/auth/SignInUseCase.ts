import { User, Result, Repository, UseCase } from '../../entities';
import { NotAuthorizedError, CustomError, UnExpectedError } from '../../errors';
import { isEmpty, compare } from '../../helpers';

export class SignInUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(body: User): Promise<Result<User>> {
    try {
      const { username, password } = body;

      //Check if the user exists
      const [userOnDB] = await this.repository.findMany({ username });

      if (isEmpty(userOnDB)) throw new NotAuthorizedError();

      //Compare the password
      if (!(await compare(userOnDB.password!, password!)))
        throw new NotAuthorizedError();

      return new Result<User>([userOnDB]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
