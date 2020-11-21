import { ProductEnum } from '../enums/ProductEnum';
import { generateUuid } from '../helpers';
import { User } from './User';

export class Product {
  constructor(
    private id: string,
    private name: string,
    private img: string,
    private supermarket: string,
    private status?: ProductEnum,
    private user?: User,
    private quantity?: number,
    private listId?: number

  ) {}

  getName(): string {
    return this.name;
  }

  getImg(): string {
    return this.img;
  }

  getId(): string {
    return this.id!;
  }

  getSupermarket(): string {
    return this.supermarket;
  }

  public static create(
    name: string,
    img: string,
    supermarket: string
  ): Product {
    return new Product(generateUuid(), name, img, supermarket);
  }
}
