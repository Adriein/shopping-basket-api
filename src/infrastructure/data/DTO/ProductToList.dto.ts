import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './List.dto';
import { Product } from './Product.dto';

@Entity('product_to_list')
export class ProductToList {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  quantity?: number;

  @Column()
  status?: string;

  @Column()
  userInCharge?: string;

  @ManyToOne((type) => List, (list) => list.productToList)
  list?: List;

  @ManyToOne((type) => Product, (product) => product.productToList)
  product?: Product;
}
