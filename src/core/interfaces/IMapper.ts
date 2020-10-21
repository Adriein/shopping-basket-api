export interface IMapper<T> {
  toDomainEntity(typeormEntity: any[]): T[];
}
