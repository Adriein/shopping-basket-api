import { User, Response } from '../../entities';
import { IUser, IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';
import { isEmpty, hash } from '../../helpers';

export class RegisterUseCase implements IUseCase<IUser> {
  constructor(private repository: IRepository<IUser>) {}

  async execute(body: User): Promise<Response<IUser>> {
    try {
      const { username, password } = body;

      //Check if the user already exists
      const [userOnDB] = await this.repository.findMany({ username });
      
      if (userOnDB && !isEmpty(userOnDB)) throw new Error('User already exists in DB');

      const user = new User(username, password);

      //Hash the password
      user.password = await hash(password);
    
      const createdUser = await this.repository.save(user);

      return new Response<IUser>([createdUser]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
