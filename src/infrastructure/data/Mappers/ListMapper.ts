import { IMapper } from '../../../domain/interfaces';
import { List as ListDto } from '../DTO/List.dto';
import { User as UserDto } from '../DTO/User.dto';
import { ListEnum } from '../../../domain/enums/ListEnum';
import { List, Product, User } from '../../../domain/entities';

export class ListMapper implements IMapper<List> {
  public toDomainEntity(list: ListDto[]): List[] {
    return list.map((listDto) => {
      return new List(
        listDto.id!,
        listDto.title!,
        this.getUsernames(listDto.users!),
        this.getStatus(listDto.status!),
        listDto.creation!,
        this.getProductInList(listDto.products!)
      );
    });
  }

  private getUsernames(users: UserDto[]): User[] {
    if (!users || users.length === 0) {
      return [];
    }
    return users.map(
      (user) =>
        new User(
          user.id!,
          user.username!,
          user.password!,
          user.publicId!,
          user.creation!
        )
    );
  }

  private getStatus(status: string): ListEnum {
    switch (status) {
      case ListEnum.CLOSED:
        return ListEnum.CLOSED;
      case ListEnum.IN_CONSTRUCTION:
        return ListEnum.IN_CONSTRUCTION;
      case ListEnum.READY:
        return ListEnum.READY;
      default:
        return ListEnum.IN_CONSTRUCTION;
    }
  }

  private getProductInList(products: any[]): Product[] {
    if (!products || products.length === 0) {
      return [];
    }

    return products.map((product: any) => {
      return new Product(
        product.product.id,
        product.product.name,
        product.product.img,
        product.product.supermarket,
        product.status,
        product.userInCharge,
        product.quantity
      );
    });
  }

  public toDto(list: List): any {
    const dto = new ListDto();
    dto.id = list.getId();
    dto.creation = list.getCreation();
    dto.status = list.getStatus();
    dto.title = list.getTitle();

    return dto;
  }
}
