import { IList, List, ListStatus, Response, User } from '../../entities';
import { IUseCase, IRepository } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class CreateListUseCase implements IUseCase<string> {
  constructor(private listRepository: IRepository<IList>, private usersRepository: IRepository<User>) {}

  async execute(body: IList, ownerId: string): Promise<Response<string>> {
    try {
      const { title, users, products } = body;

      const list = new List(
        title,
        this.getUsers(users),
        ListStatus.IN_CONSTRUCTION,
        undefined,
        products
      );
      
      const user = this.usersRepository.findOne(ownerId);
      
      //Add the owner of the list in the first position
      list.users.unshift(user);

      await this.listRepository.save(list);

      return new Response(['List created']);
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
