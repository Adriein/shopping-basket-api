import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './List.dto';
import { Product } from './Product.dto';
import { User } from './User.dto';

@Entity()
export class ProductToList {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: string;

  @Column()
  listId!: string;

  @Column()
  quantity!: number;

  @Column()
  status?: string;

  @ManyToOne((type) => List, (list) => list.id)
  list!: string;

  @ManyToOne((type) => Product, (product) => product.id)
  product!: string;

  @ManyToOne(() => User, (user) => user.id)
  userInCharge?: string;
}
