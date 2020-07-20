import {
  Result,
  UseCase,
  PushNotification,
  Service,
  Repository,
  PushNotificationSubscription,
  User,
} from '../entities';
import { isEmpty } from '../helpers';
import { BadRequest, CustomError, UnExpectedError } from '../errors';

export class SendPushNotifiactionUseCase implements UseCase<boolean> {
  constructor(
    private service: Service,
    private pushNotificationSubscriptionRepository: Repository<
      PushNotificationSubscription
    >
  ) {}

  async execute(
    users: string[],
    pushNotification: PushNotification
  ): Promise<Result<boolean>> {
    try {
      for (const user of users) {
        const subscriptionOnDb = await this.pushNotificationSubscriptionRepository.findOne(
          user
        );

        if (isEmpty(subscriptionOnDb))
          throw new BadRequest('The subscription not exists');

        this.service.send(subscriptionOnDb.pushSubscription, pushNotification);
      }

      return new Result([true]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
