import { Response } from '../../entities';
import { NotAuthorizedError, CustomError, UnExpectedError } from '../../errors';
import { isEmpty, compare } from '../../helpers';
import { IRepository, IUseCase, IUser } from '../../interfaces';

export class SignInUseCase implements IUseCase<IUser> {
  constructor(private repository: IRepository<IUser>) {}

  async execute(body: {
    username: string;
    password: string;
  }): Promise<Response<IUser>> {
    try {
      const { username, password } = body;

      //Check if the user exists
      const [userOnDB] = await this.repository.findMany({ username });

      if (isEmpty(userOnDB)) throw new NotAuthorizedError();

      //Compare the password
      if (!(await compare(userOnDB.password!, password!)))
        throw new NotAuthorizedError();

      return new Response<IUser>([userOnDB]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
