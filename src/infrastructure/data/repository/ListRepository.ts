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
    return this.mapper.toDomainEntity(lists) as List[];
  }

  async save(list: List): Promise<List> {
    const listDto = this.mapper.toDto(list);
    const listDTO: ListDTO = await this.database
      .getRepository(ListDTO)
      .save(listDto);

    await this.database
      .createQueryBuilder()
      .relation(ListDTO, 'users')
      .of(listDTO.id)
      .add(list.getUsers().map((user) => user.getId()));

    if (list.getProducts()) {
      await this.saveProductToList(list.getProducts(), list);
    }

    return list;
  }

  async update(id: string, list: List): Promise<List> {
    const listOnDb = await this.database.getRepository(ListDTO).findOne(id);

    listOnDb!.status = list.getStatus();
    listOnDb!.title = list.getTitle();
    listOnDb!.creation = list.getCreation();

    const usersAsociated = await this.database
      .createQueryBuilder()
      .relation(ListDTO, 'users')
      .of(listOnDb!.id)
      .loadMany();

    await this.database
      .createQueryBuilder()
      .relation(ListDTO, 'users')
      .of(listOnDb!.id)
      .remove(usersAsociated);

    await this.database
      .createQueryBuilder()
      .relation(ListDTO, 'users')
      .of(listOnDb!.id)
      .add(list.getUsers().map((user) => user.getId()));

    await this.database.getRepository(ListDTO).save(listOnDb!);

    if (list.getProducts()) {
      await this.updateProductToList(list.getProducts(), listOnDb);
    }
    return list as List;
  }

  private async saveProductToList(
    products: Product[],
    list: any
  ): Promise<void> {
    await Promise.all(
      products.map(async (product) => {
        const productOnDb: any = await this.database
          .getRepository(ProductDTO)
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
    products: Product[],
    list: any
  ): Promise<void> {
    const productsAsociated = await this.database
      .createQueryBuilder()
      .relation(ListDTO, 'products')
      .of(list.id)
      .loadMany();

    await Promise.all(
      productsAsociated.map(async (productsAsociated) => {
        await this.database
          .getRepository(ProductToList)
          .delete(productsAsociated.id);
      })
    );

    await Promise.all(
      products.map(async (product: Product) => {
        const productToList = new ProductToList();
        const productOnDb: any = await this.database
          .getRepository(ProductDTO)
          .findOne(product.getId());
        productToList.userInCharge = product.getUser();
        productToList!.quantity = product.getQuantity();
        productToList!.status = product.getStatus();
        productToList!.list = list;
        productToList!.product = productOnDb;

        await this.database.getRepository(ProductToList).save(productToList);
      })
    );
  }
}
