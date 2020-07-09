export class Result<T> {
  constructor(private _data: T[]) {}

  get data(): T[]{
    return this._data;
  }
}
