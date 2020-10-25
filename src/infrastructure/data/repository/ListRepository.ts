import { IList, ProductStatus } from '../../../core/entities';
import { IMapper } from '../../../core/interfaces';
import { List } from '../DTO/List.dto';
import { Product } from '../DTO/Product.dto';
import { ProductToList } from '../DTO/ProductToList.dto';
import { BaseRepository } from './BaseRepository';

export class ListRepository extends BaseRepository<IList> {
  constructor(entity: string, mapper: IMapper<IList>) {
    super(entity, mapper);
  }

  async findMany(searchObj: any): Promise<IList[]> {
    const entities = await this.database.find(this.entity, searchObj);
    console.log(JSON.stringify(entities));

    return this.mapper.toDomainEntity(entities);
  }

  async save(body: IList): Promise<IList> {
    const listDto = this.mapper.toDto(body);
    const list = await this.database.getRepository(List).save(listDto);

    await this.database
      .createQueryBuilder()
      .relation(List, 'users')
      .of(list.id)
      .add(body.users);

    if (body.products) {
      await Promise.all(
        body.products.map(async (product) => {
          const productOnDb = await this.database
            .getRepository(Product)
            .findOne(product.id);

          const productToList = new ProductToList();

          productToList.quantity = product.quantity;
          productToList.status = ProductStatus.active;
          productToList.userInCharge = product.userInCharge;
          productToList.list = list;
          productToList.product = productOnDb;

          await this.database.getRepository(ProductToList).save(productToList);
        })
      );
    }

    return list;
  }
}
