import { IList, ProductStatus } from '../../../core/entities';
import { IMapper, IProductInList } from '../../../core/interfaces';
import { users } from '../../../routes/users';
import { List } from '../DTO/List.dto';
import { Product } from '../DTO/Product.dto';
import { ProductToList } from '../DTO/ProductToList.dto';
import { BaseRepository } from './BaseRepository';

export class ListRepository extends BaseRepository<IList> {
  constructor(entity: string, mapper: IMapper<IList>) {
    super(entity, mapper);
  }

  async findMany(searchObj: any): Promise<IList[]> {
    const lists: List[] = await this.database.find(this.entity, searchObj);
    for (let list of lists) {
      list.productToList = await Promise.all(
        list.productToList.map(async (productToList) => {
          const [hydratedProductToList] = await this.database
            .getRepository(ProductToList)
            .find({
              relations: ['product'],
              where: { id: productToList.id },
            });

          return hydratedProductToList;
        })
      );
    }
    return this.mapper.toDomainEntity(lists);
  }

  async save(body: IList): Promise<IList> {
    const listDto = this.mapper.toDto(body);
    const list = await this.database.getRepository(List).save(listDto);

    await this.database
      .createQueryBuilder()
      .relation(List, 'users')
      .of(list.id)
      .add(body.users.map((user) => user.id));

    if (body.products) {
      await this.saveProductToList(body.products, list);
    }

    return list;
  }

  async update(id: string, body: IList): Promise<IList> {
    const list = await this.database.getRepository(List).findOne(id);

    list!.status = body.status;
    list!.title = body.title;
    list!.creation = body.creation;

    const usersAsociated = await this.database
      .createQueryBuilder()
      .relation(List, 'users')
      .of(list!.id)
      .loadMany();

    await this.database
      .createQueryBuilder()
      .relation(List, 'users')
      .of(list!.id)
      .remove(usersAsociated);

    await this.database
      .createQueryBuilder()
      .relation(List, 'users')
      .of(list!.id)
      .add(body.users.map((user) => user.id));

    await this.database.getRepository(List).save(list!);

    if (body.products) {
      await this.updateProductToList(body.products, list);
    }
    return list as IList;
  }

  private async saveProductToList(
    products: IProductInList[],
    list: any
  ): Promise<void> {
    await Promise.all(
      products.map(async (product) => {
        const productOnDb = await this.database
          .getRepository(Product)
          .findOne(product.id);

        const productToList = new ProductToList();

        productToList.quantity = product.quantity;
        productToList.status = ProductStatus.NOT_BOUGHT;
        productToList.userInCharge = product.userInCharge;
        productToList.list = list;
        productToList.product = productOnDb;

        await this.database.getRepository(ProductToList).save(productToList);
      })
    );
  }

  private async updateProductToList(
    products: IProductInList[],
    list: any
  ): Promise<void> {
    await Promise.all(
      products.map(async (product) => {
        const productOnDb = await this.database
          .getRepository(Product)
          .findOne(product.productId);

        const productToList = await this.database
          .getRepository(ProductToList)
          .findOne(product.id);

        productToList!.quantity = product.quantity;
        productToList!.status = product.status;
        productToList!.userInCharge = product.userInCharge;
        productToList!.list = list;
        productToList!.product = productOnDb;

        await this.database.getRepository(ProductToList).save(productToList!);
      })
    );
  }
}
