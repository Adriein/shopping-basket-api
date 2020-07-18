import { User, Result, Repository, UseCase } from '../../entities';
import { AlreadyExists, CustomError, UnExpectedError } from '../../errors';
import { isEmpty, toHash } from '../../helpers';

export class RegisterUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(body: User): Promise<Result<User>> {
    try {
      const { username, password } = body;

      //Check if the user already exists
      const userOnDB = await this.repository.findOne(username!);
      
      if (!isEmpty(userOnDB))
        throw new AlreadyExists('User already exists in DB');

      //Hash the password
      body.password = await toHash(password!);

      const createdUser = await this.repository.save(body);

      return new Result<User>([createdUser]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
