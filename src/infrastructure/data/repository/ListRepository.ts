import { List, Product } from '../../../core/entities';
import { ProductEnum } from '../../../core/enums/ProductEnum';
import { IMapper } from '../../../core/interfaces';
import { List as ListDTO } from '../DTO/List.dto';
import { Product as ProductDTO } from '../DTO/Product.dto';
import { ProductToList } from '../DTO/ProductToList.dto';
import { BaseRepository } from './BaseRepository';

export class ListRepository extends BaseRepository<List> {
  constructor(entity: string, mapper: IMapper<List>) {
    super(entity, mapper);
  }

  async findMany(searchObj: any): Promise<List[]> {
    const lists: ListDTO[] = await this.database.find(this.entity, searchObj);
    for (let list of lists) {
      list.products = await Promise.all(
        list.products.map(async (productToList) => {
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

  async save(list: List): Promise<List> {
    const listDto = this.mapper.toDto(list);
    const listDTO: ListDTO = await this.database
      .getRepository(List)
      .save(listDto);

    await this.database
      .createQueryBuilder()
      .relation(List, 'users')
      .of(listDTO.id)
      .add(list.getUsers().map((user) => user.getId()));

    if (list.getProducts()) {
      await this.saveProductToList(list.getProducts(), list);
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
    products: Product[],
    list: any
  ): Promise<void> {
    await Promise.all(
      products.map(async (product) => {
        const productOnDb: any = await this.database
          .getRepository(Product)
          .findOne(product.getId());

        const productToList = new ProductToList();

        productToList.quantity = product.getQuantity();
        productToList.status = ProductEnum.NOT_BOUGHT;
        productToList.userInCharge = product.getUser();
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
