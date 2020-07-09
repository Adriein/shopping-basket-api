import { User, Result, Repository, UseCase } from '../entities';
import { BadRequest, NotAuthorizedError } from '../errors';
import { isEmpty, compare } from '../helpers';

export class SignInUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(body: User): Promise<Result<User>> {
    const { username, password } = body;

    //Check if the user exists
    const [userOnDB] = await this.repository.findMany({ username });

    if (isEmpty(userOnDB)) throw new NotAuthorizedError();

    //Compare the password
    if (!(await compare(userOnDB.password!, password!)))
      throw new NotAuthorizedError();

    return new Result<User>([userOnDB]);
  }
}
