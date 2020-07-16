import {
  Result,
  Repository,
  UseCase,
  PushNotificationSubscription,
} from '../../entities';

import { isEmpty } from '../../helpers';

export class RegisterPushSubscriptionUseCase
  implements UseCase<PushNotificationSubscription> {
  constructor(private repository: Repository<PushNotificationSubscription>) {}

  async execute(
    userId: string,
    body: any
  ): Promise<Result<PushNotificationSubscription>> {
    //Check if the subscription exists
    const subscriptionOnDb = await this.repository.findOne(userId);

    if (isEmpty(subscriptionOnDb)) {
      return new Result<PushNotificationSubscription>([
        await this.repository.save({ userId, pushSubscription: body }),
      ]);
    }

    return new Result<PushNotificationSubscription>([
      await this.repository.update(subscriptionOnDb._id!, {
        userId,
        pushSubscription: body,
      }),
    ]);
  }
}
