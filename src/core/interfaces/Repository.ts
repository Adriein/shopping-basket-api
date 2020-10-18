export interface Repository<T> {
  findOne(id: string): Promise<T>;
  findMany(searchObj: any): Promise<T[]>;
  save(body: T): Promise<T>;
  update(id: string, body: T): Promise<T>;
  delete(id: string): Promise<number>;
}
