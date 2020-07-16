import webpush from 'web-push';
import { Service, PushNotification } from '../../core/entities';
import { CustomError, UnExpectedError } from '../../core/errors';

export class PushNotificationService implements Service {
  constructor() {
    webpush.setVapidDetails(
      'mailto:adria.claret@gmail.com',
      process.env.PUBLIC_VAPID_KEY!,
      process.env.PRIVATE_VAPID_KEY!
    );
  }

  async send(
    pushSubscription: webpush.PushSubscription,
    payload: PushNotification
  ): Promise<any> {
    try {
      await webpush.sendNotification(pushSubscription, JSON.stringify(payload));
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
