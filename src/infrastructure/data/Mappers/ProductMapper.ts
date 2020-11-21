import { Product } from '../../../core/entities';
import { IMapper } from '../../../core/interfaces';
import { Product as ProductDto } from '../DTO/Product.dto';

export class ProductMapper implements IMapper<Product> {
  public toDomainEntity(products: ProductDto[]): Product[] {
    return products.map((productDto: ProductDto) => {
      return new Product(
        productDto.id!,
        productDto.name!,
        productDto.img!,
        productDto.supermarket!
      );
    });
  }

  public toDto(product: Product): any {
    throw new Error();
  }
}
