import { IRepository, IMapper } from '../../../core/interfaces';
import { getConnection } from 'typeorm';

export class BaseRepository<T> implements IRepository<T> {
  protected database = getConnection().manager;
  constructor(protected entity: any, protected mapper: IMapper<T>) {}

  async findOne(id: string): Promise<T> {
    const entity = await this.database.findByIds(this.entity, [id]);
    const [domainEntity] = this.mapper.toDomainEntity(entity) as T[];

    return domainEntity;
  }
  async findMany(searchObj: any): Promise<T[]> {
    const entities = await this.database.find(this.entity, searchObj);
    return this.mapper.toDomainEntity(entities) as T[];
  }
  async save(body: T): Promise<T> {
    const entity = await this.database.save(this.entity, body);
    return this.mapper.toDomainEntity(entity) as T;
  }
  async update(...args: any[]): Promise<T> {
    const [id, body] = args;
    const entity = await this.database.findOne(id);
    const bodyToDto = this.mapper.toDto(body);
    const mergedEntity = Object.assign({}, entity, bodyToDto);
    const savedEntity = await this.database.save(mergedEntity);

    return this.mapper.toDomainEntity(savedEntity) as T;
  }
  delete(id: string): Promise<number> {
    throw new Error();
  }
}
