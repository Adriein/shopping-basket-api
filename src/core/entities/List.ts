import { ListEnum } from '../enums/ListEnum';
import { ValidationError } from '../errors/ValidationError';
import { generateUuid, maskFields } from '../helpers';
import { Product } from './Product';
import { User } from './User';

export class List {
  private id: string;
  private title: string;
  private users: User[];
  private status: ListEnum;
  private creation: Date;
  private products: Product[];

  constructor(
    id: string,
    title: string,
    users: User[],
    status: ListEnum,
    creation: Date,
    products: Product[]
  ) {
    this.id = id;
    this.title = title;
    this.users = users.map((user) =>
      maskFields(user, ['password', 'publicId', 'creation'])
    ) as User[];
    this.status = status;
    this.products = products;
    this.creation = creation;
  }

  public static create(
    title: string,
    users: User[],
    status: ListEnum,
    products: Product[] = []
  ): List {
    const _title = List.validate('title', title) as string;
    const _status = List.validate('status', title) as ListEnum;
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

  public getUsers(): User[] {
    return this.users;
  }

  public getStatus(): ListEnum {
    return this.status;
  }

  public getCreation(): Date {
    return this.creation;
  }

  public getProducts(): Product[] {
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
          (value !== ListEnum.CLOSED &&
            value !== ListEnum.IN_CONSTRUCTION &&
            value !== ListEnum.READY)
        ) {
          throw new ValidationError(
            `Field ${field} must be one of the following: ${ListEnum.CLOSED}, ${ListEnum.IN_CONSTRUCTION} or ${ListEnum.READY}`
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
