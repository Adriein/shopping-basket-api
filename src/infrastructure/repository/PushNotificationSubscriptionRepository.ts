import { Repository, PushNotificationSubscription } from '../../core/entities';
import { PushNotificationSubscriptionModel } from '../data/schemas';

export class PushNotificationSubscriptionRepository
  implements Repository<PushNotificationSubscription> {
  constructor() {}

  async findMany(searchObj: any): Promise<PushNotificationSubscription[]> {
    throw new Error();
  }

  async findOne(id: string): Promise<PushNotificationSubscription> {
    const response = await PushNotificationSubscriptionModel.findOne({
      userId: id,
    }).exec();
    if (response !== null) return response;
    return {} as PushNotificationSubscription;
  }

  async save(body: any): Promise<PushNotificationSubscription> {
    return await new PushNotificationSubscriptionModel(body).save();
  }

  async update(
    id: string,
    body: PushNotificationSubscription
  ): Promise<PushNotificationSubscription> {
    return await new PushNotificationSubscriptionModel(body).updateOne(
      { _id: id },
      body
    );
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
