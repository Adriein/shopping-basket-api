import { List, Product, User } from '../../domain/entities';
import { RegisterUserHandler, SigninHandler } from '../../domain/usecases';
import { ListMapper } from '../../infrastructure/data/Mappers/ListMapper';
import { ProductMapper } from '../../infrastructure/data/Mappers/ProductMapper';
import { UserMapper } from '../../infrastructure/data/Mappers/UserMapper';
import { BaseRepository } from '../../infrastructure/data/repository';
import { ListRepository } from '../../infrastructure/data/repository/ListRepository';
import { ICommand, ICommandBus, IRepository } from '../../domain/interfaces';

export class CommandBus implements ICommandBus {
  private userRepository: IRepository<User>;
  private productRepository: IRepository<Product>;
  private listRepository: IRepository<List>;

  constructor() {
    this.userRepository = new BaseRepository<User>('User', new UserMapper());
    this.productRepository = new BaseRepository<Product>(
      'Product',
      new ProductMapper()
    );
    this.listRepository = new ListRepository('List', new ListMapper());
  }

  public async execute(command: ICommand): Promise<any> {
    return this.resolveHandler(command).handle(command);
  }

  private resolveHandler(command: ICommand) {
    switch (command) {
      case command instanceof RegisterUserHandler:
        return new RegisterUserHandler(this.userRepository);
      case command instanceof SigninHandler:
        return new SigninHandler(this.userRepository);
      default:
        throw new Error();
    }
  }
}
