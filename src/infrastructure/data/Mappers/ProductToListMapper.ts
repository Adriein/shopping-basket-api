import { Product } from '../../../core/entities';
import { IMapper } from '../../../core/interfaces';
import { ProductToList as ProductToListDto } from '../DTO/ProductToList.dto';
import { Product as ProductDto } from '../DTO/Product.dto';
import { ProductEnum } from '../../../core/enums/ProductEnum';

export class ProductToListMapper implements IMapper<Product> {
  public toDomainEntity(productToListDto: ProductToListDto): Product {
    return new Product(
      productToListDto.product?.id!,
      productToListDto.product?.name!,
      productToListDto.product?.img!,
      productToListDto.product?.supermarket!,
      productToListDto.status! as ProductEnum,
      productToListDto.userInCharge,
      productToListDto.quantity,
      productToListDto.list?.id
    );
  }

  public toDto(product: Product): ProductToListDto {
    const productToListDto = new ProductToListDto();
    
    productToListDto.quantity = product.getQuantity();
    productToListDto.status = product.getStatus();
    productToListDto.userInCharge = product.getUser();

    return productToListDto;
  }
}
