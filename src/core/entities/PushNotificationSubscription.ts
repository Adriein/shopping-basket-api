export interface PushNotificationSubscription {
  _id?: string;
  userId?: string;
  pushSubscription: {
    endpoint: string;
    expirationTime: null;
    keys: { p256dh: string; auth: string };
  };
}
