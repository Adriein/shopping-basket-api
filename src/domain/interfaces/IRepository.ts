export interface IRepository<T> {
  findOne(id: string): Promise<T>;
  find(searchObj: any): Promise<T[]>;
  save(body: T): Promise<T>;
  update(...args: any[]): Promise<T>;
  delete(id: string): Promise<number>;
}
