import {
  Result,
  Repository,
  UseCase,
  Basket,
  User,
  Service,
  PushNotificationSubscription,
} from '../../entities';
import { BadRequest, CustomError, UnExpectedError } from '../../errors';
import { SendPushNotifiactionUseCase } from '../SendPushNotificationUseCase';
import { isEqual } from '../../helpers';

export class CreateBasketUseCase implements UseCase<Basket> {
  constructor(
    private repository: Repository<Basket>,
    private usersRepository: Repository<User>,
    private pushNotificationSubscriptionRepository: Repository<
      PushNotificationSubscription
    >,
    private service: Service
  ) {}

  async execute(basket: any): Promise<Result<Basket>> {
    try {
      const { users } = basket;
      //Check if the basket contains valid users (atleast always come with one user, the creator of the family unit)
      for (const user of users) {
        const userOnDb = await this.usersRepository.findOne(user.username!);
        if (!userOnDb)
          throw new BadRequest(`No user with username: ${user.username} found`);
      }

      //Check if the basket already exists
      (await this.repository.findMany({})).forEach((group) => {
        const usersIds = group.users.map((user) => user.id);
        if (isEqual(basket.users, usersIds)) {
          throw new BadRequest('This group already exists');
        }
      });

      //Create the basket
      const createdBasket = await this.repository.save(basket);

      //Notify other users related to family unit
      const sendSubscription = new SendPushNotifiactionUseCase(
        this.service,
        this.pushNotificationSubscriptionRepository
      );
      users.push(basket.owner);
      await sendSubscription.execute(users, {
        title: 'Shopping List',
        message: `Te han añadido a una unidad familiar`,
      });

      return new Result<Basket>([createdBasket]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
