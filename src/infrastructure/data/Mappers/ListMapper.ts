import {
  IList,
  IMapper,
  IProductInList,
  IUser,
} from '../../../core/interfaces';
import { List as ListDto } from '../DTO/List.dto';
import { User as UserDto } from '../DTO/User.dto';

import { ListStatus } from '../../../core/entities';

export class ListMapper implements IMapper<IList> {
  public toDomainEntity(list: ListDto[]): IList[] {
    return list.map((listDto) => {
      return {
        id: listDto.id!,
        title: listDto.title!,
        users: this.getUsernames(listDto.users!),
        status: this.getStatus(listDto.status!),
        creation: listDto.creation!,
        products: this.getProductInList(listDto.productToList!),
      };
    });
  }

  private getUsernames(users: UserDto[]): IUser[] {
    if (!users || users.length === 0) {
      return [];
    }
    return users.map((user) => {
      return { username: user.username!, id: user.id! };
    });
  }

  private getStatus(status: string): ListStatus {
    switch (status) {
      case ListStatus.CLOSED:
        return ListStatus.CLOSED;
      case ListStatus.IN_CONSTRUCTION:
        return ListStatus.IN_CONSTRUCTION;
      case ListStatus.READY:
        return ListStatus.READY;
      default:
        return ListStatus.IN_CONSTRUCTION;
    }
  }

  private getProductInList(products: any[]): IProductInList[] {
    if (!products || products.length === 0) {
      return [];
    }

    return products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        supermarket: product.supermarket,
        img: product.img,
        quantity: product.quantity,
        status: product.status,
        userInCharge: product.userInCharge,
      };
    });
  }

  public toDto(list: IList): any {
    const dto = new ListDto();
    dto.id = list.id;
    dto.creation = list.creation;
    dto.status = list.status;
    dto.title = list.title;

    return dto;
  }
}
