export interface Mapper<T> {
  toDomainEntity(typeormEntity: any[]): T[];
}
