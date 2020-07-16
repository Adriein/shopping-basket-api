import {
  Result,
  UseCase,
  PushNotification,
  Service,
  Repository,
  PushNotificationSubscription,
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
    userId: string,
    pushNotification: PushNotification
  ): Promise<Result<boolean>> {
    try {
      const subscriptionOnDb = await this.pushNotificationSubscriptionRepository.findOne(
        userId
      );

      if (isEmpty(subscriptionOnDb))
        throw new BadRequest('The subscription not exists');

      this.service.send(subscriptionOnDb.pushSubscription, pushNotification);

      return new Result([true]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
