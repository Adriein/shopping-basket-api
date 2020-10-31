import { generateUuid } from '../helpers';
import { IList, IProductInList, IUser } from '../interfaces';
import { ListStatus } from './ListStatus';

export class List implements IList {
  private _id?: string;
  private _title: string;
  private _users: IUser[];
  private _status: ListStatus;
  private _creation!: Date;
  private _products?: IProductInList[];

  constructor(
    title: string,
    users: IUser[],
    status: ListStatus,
    id?: string,
    products?: IProductInList[]
  ) {
    if (!id) {
      this._id = generateUuid();
      this._creation = new Date();
    }

    this._title = title;
    this._users = users;
    this._status = status;
    this._products = products;
  }

  public get id(): string {
    return this._id!;
  }

  public get title(): string {
    return this._title;
  }

  public get users(): IUser[] {
    return this._users;
  }

  public get status(): ListStatus {
    return this._status;
  }

  public get creation(): Date {
    return this._creation;
  }

  public get products(): IProductInList[] {
    return this._products!;
  }
}
