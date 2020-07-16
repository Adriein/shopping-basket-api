import mongoose, { Schema } from 'mongoose';

export interface PushNotificationSubscriptionDoc extends mongoose.Document {
  _id: string;
  userId: string;
  pushSubscription: {
    endpoint: string;
    expirationTime: null;
    keys: { p256dh: string; auth: string };
  };
}

const pushNotificationSubscriptionSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  pushSubscription: {
    type: Object,
    required: true,
  },
});

export const PushNotificationSubscriptionModel = mongoose.model<PushNotificationSubscriptionDoc>(
  'PushNotificationSubscription',
  pushNotificationSubscriptionSchema
);
