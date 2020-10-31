import { IList, Response } from '../../entities';
import { IUseCase, IRepository, IProduct } from '../../interfaces';
import { CustomError, UnExpectedError } from '../../errors';

export class GetListUseCase implements IUseCase<IList> {
  constructor(private repository: IRepository<IList>) {}

  async execute(id?: string): Promise<Response<IList>> {
    try {
      if (id) {
        const list = await this.repository.findMany({
          relations: ['users', 'productToList'],
          where: { id },
        });
        return new Response(list);
      }

      const lists = await this.repository.findMany({
        relations: ['users', 'productToList'],
      });

      return new Response(lists);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
