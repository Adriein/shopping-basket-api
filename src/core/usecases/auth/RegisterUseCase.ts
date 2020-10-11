import { User, Response, Repository, UseCase } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';
import { isEmpty, hash } from '../../helpers';

export class RegisterUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(body: User): Promise<Response<User>> {
    try {
      const { username, password } = body;

      //Check if the user already exists
      const [userOnDB] = await this.repository.findMany({ username });
      console.log(userOnDB);
      
      if (userOnDB && !isEmpty(userOnDB)) throw new Error('User already exists in DB');

      const user = new User(username, password);

      //Hash the password
      user.password = await hash(password!);
    
      const createdUser = await this.repository.save(user);

      return new Response<User>([createdUser]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
