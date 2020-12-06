
export interface IMapper<T> {
  toDomainEntity(typeormEntity: any[] | any): T[] | T;
  toDto(domainEntity: T): any;
}
