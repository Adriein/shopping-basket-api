export class ShoppingBasketResponse {
  constructor(private _data: any[]) {}

  get data(): any[] {
    return this._data;
  }
}
