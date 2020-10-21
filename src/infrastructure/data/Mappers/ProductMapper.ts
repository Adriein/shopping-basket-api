import { IProduct, IMapper } from '../../../core/interfaces';
import { Product as ProductDto } from '../DTO/Product.dto';

export class ProductMapper implements IMapper<IProduct> {
  public toDomainEntity(products: ProductDto[]): IProduct[] {
    return products.map((productDto) => {
      return {
        id: productDto.id!,
        name: productDto.name!,
        img: productDto.img!,
        supermarket: productDto.supermarket!,
      };
    });
  }
}
