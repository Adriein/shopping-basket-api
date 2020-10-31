import { IList, List, ListStatus, Response, User } from '../../entities';
import { IUseCase, IRepository, IUser } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class UpdateListUseCase implements IUseCase<string> {
  constructor(private repository: IRepository<IList>) {}

  async execute(id: string, body: IList): Promise<Response<string>> {
    try {
      const { title, users, products, status } = body;

      const list = new List(title, this.getUsers(users), status, id, products);

      await this.repository.update(id, list);

      return new Response(['List updated']);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }

  private getUsers(users: any): IUser[] {
    return users.map((userId: any) => {
      return new User('', '', userId);
    });
  }
}
