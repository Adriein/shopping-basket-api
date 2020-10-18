import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './List.dto';
import { Product } from './Product.dto';
import { User } from './User.dto';

@Entity()
export class ProductToList {
  @PrimaryGeneratedColumn()
  public postToCategoryId!: number;

  @Column()
  public productId!: string;

  @Column()
  public listId!: string;

  @Column()
  public quantity!: number;

  @Column()
  status?: string;

  @ManyToOne((type) => List, (list) => list.id)
  public list!: string;

  @ManyToOne((type) => Product, (product) => product.id)
  public product!: string;

  @ManyToOne(() => User, (user) => user.id)
  userInCharge?: string;
}
