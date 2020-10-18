import { generateShortId, generateUuid } from '../helpers';
import { IUser } from '../interfaces/IUser';

export class User implements IUser{
  private _id: string;
  private _publicId: string;
  private _username: string;
  private _password: string;
  private _creation: Date;

  constructor(
    username: string,
    password: string,
    id?: string,
    publicId?: string,
    creation?: Date
  ) {
    this._username = username;
    this._password = password;
    if (!id) {
      this._id = generateUuid();
      this._publicId = generateShortId();
      this._creation = new Date();
    } else {
      this._id = id;
      this._publicId = publicId!;
      this._creation = creation!;
    }
  }

  public get publicId(): string {
    return this._publicId;
  }
  public set publicId(value: string) {
    this._publicId = value;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  public get creation(): Date {
    return this._creation;
  }
  public set creation(value: Date) {
    this._creation = value;
  }
}
