
export interface IMapper<T> {
  toDomainEntity(typeormEntity: any[]): T[];
  toDto(domainEntity: T): any;
}
