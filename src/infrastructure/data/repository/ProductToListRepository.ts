import { Product } from '../../../domain/entities';
import { BaseRepository } from './BaseRepository';

export class ProductToListRepository extends BaseRepository<Product> {
  public async update(
    listId: string,
    productId: string,
    product: Product
  ): Promise<Product> {
    const productToListOnDb = await super.database.find('ProductToList', {
      listId,
      productId,
    });

    const productUpdated = this.mapper.toDto(product);
    const mergedEntity = Object.assign({}, productToListOnDb, productUpdated);

    const updatedProductToList = await super.database.save(
      'ProductToList',
      mergedEntity
    );
    return super.mapper.toDomainEntity(updatedProductToList) as Product;
  }
}
