import { ValidationError } from '../errors/ValidationError';
import { generateUuid } from '../helpers';
import { IProductInList, IUser } from '../interfaces';
import { ListStatus } from './ListStatus';

export class List {
  private id: string;
  private title: string;
  private users: IUser[];
  private status: ListStatus;
  private creation: Date;
  private products: IProductInList[];

  constructor(
    id: string,
    title: string,
    users: IUser[],
    status: ListStatus,
    creation: Date,
    products: IProductInList[]
  ) {
    this.id = id;
    this.title = title;
    this.users = users;
    this.status = status;
    this.products = products;
    this.creation = creation;
  }

  public static create(
    title: string,
    users: IUser[],
    status: ListStatus,
    products: IProductInList[] = []
  ): List {
    const _title = List.validate('title', title) as string;
    const _status = List.validate('status', title) as ListStatus;
    const _users = users; //User.create();
    const _products = products; //ProductsInList.create();

    return new List(
      generateUuid(),
      _title,
      _users,
      _status,
      new Date(),
      _products
    );
  }

  public getId(): string {
    return this.id!;
  }

  public getTitle(): string {
    return this.title;
  }

  public getUsers(): IUser[] {
    return this.users;
  }

  public getStatus(): ListStatus {
    return this.status;
  }

  public getCreation(): Date {
    return this.creation;
  }

  public getProducts(): IProductInList[] {
    return this.products!;
  }

  private static validate(field: string, value: any) {
    switch (field) {
      case 'title':
        if (typeof value !== 'string') {
          throw new ValidationError(`Field ${field} must be a string`);
        }
        return value;
      case 'status':
        if (
          typeof status !== 'string' ||
          (value !== ListStatus.CLOSED &&
            value !== ListStatus.IN_CONSTRUCTION &&
            value !== ListStatus.READY)
        ) {
          throw new ValidationError(
            `Field ${field} must be one of the following: ${ListStatus.CLOSED}, ${ListStatus.IN_CONSTRUCTION} or ${ListStatus.READY}`
          );
        }
        return value;
      default:
        throw new ValidationError(
          `Field ${field} is not defined in List class`
        );
    }
  }
}
