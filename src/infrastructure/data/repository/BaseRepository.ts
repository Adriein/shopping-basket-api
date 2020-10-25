import { IRepository, IMapper } from '../../../core/interfaces';
import { getConnection } from 'typeorm';

export class BaseRepository<T> implements IRepository<T> {
  protected database = getConnection().manager;
  constructor(protected entity: any, protected mapper: IMapper<T>) {}

  async findOne(id: string): Promise<T> {
    const entity = await this.database.findByIds(this.entity, [id]);
    const [domainEntity] = this.mapper.toDomainEntity(entity);

    return domainEntity;
  }
  async findMany(searchObj: any): Promise<T[]> {
    const entities = await this.database.find(this.entity, searchObj);
    return this.mapper.toDomainEntity(entities);
  }
  async save(body: T): Promise<T> {
    const entity = await this.database.save(this.entity, body);
    const [domainEntity] = this.mapper.toDomainEntity([entity]);

    return domainEntity;
  }
  update(id: string, body: T): Promise<T> {
    throw new Error();
  }
  delete(id: string): Promise<number> {
    throw new Error();
  }
}
