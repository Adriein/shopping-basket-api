import { IUser } from './IUser';

export interface IUserToFriend {
  id?: number;
  userId1: string;
  userId2: string | IUser;
}
