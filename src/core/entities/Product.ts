import { generateUuid } from '../helpers';
import { IProduct } from '../interfaces/IProduct';

export class Product implements IProduct {
  constructor(
    private _name: string,
    private _img: string,
    private _supermarket: string,
    private _id?: string
  ) {
    if (!_id) {
      this._id = generateUuid();
    }
  }

  get name(): string {
    return this._name;
  }

  get img(): string {
    return this._img;
  }

  get id(): string {
    return this._id!;
  }

  get supermarket(): string {
    return this._supermarket;
  }
}
