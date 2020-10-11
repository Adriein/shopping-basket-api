import { Repository, Mapper } from '../../../core/entities';
import { getConnection } from 'typeorm';
import { User } from '../DTO/User.dto';

export class BaseRepository<T> implements Repository<T> {
  private database = getConnection().manager;
  constructor(private entity: any, private mapper: Mapper<T>) {}

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
    const entity = await this.database.save(User, body);
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
