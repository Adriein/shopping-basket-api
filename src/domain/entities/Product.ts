import { ProductEnum } from '../enums/ProductEnum';
import { generateUuid } from '../helpers';

export class Product {
  constructor(
    private id: string,
    private name: string,
    private img: string,
    private supermarket: string,
    private status?: ProductEnum,
    private user?: string,
    private quantity?: number,
    private listId?: string
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

  getUser(): string {
    return this.user!;
  }

  getStatus(): ProductEnum {
    return this.status!;
  }

  getQuantity(): number {
    return this.quantity!;
  }

  getListId(): string | undefined {
    return this.listId;
  }

  public static create(
    name: string,
    img: string,
    supermarket: string
  ): Product {
    return new Product(generateUuid(), name, img, supermarket);
  }
}
