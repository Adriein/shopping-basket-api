import { User, Response, Repository, UseCase } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';
import { isEmpty, toHash } from '../../helpers';

export class RegisterUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(body: User): Promise<Response<User>> {
    try {
      const { username, password } = body;

      //Check if the user already exists
      const userOnDB = await this.repository.findOne(username!);
      
      if (!isEmpty(userOnDB))
        throw new Error('User already exists in DB');

      //Hash the password
      body.password = await toHash(password!);

      const createdUser = await this.repository.save(body);

      return new Response<User>([createdUser]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
