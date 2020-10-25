import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductToList } from './ProductToList.dto';
import { User } from './User.dto';

@Entity('product')
export class Product {
  @PrimaryColumn()
  id?: string;
  @Column()
  name?: string;
  @Column()
  img?: string;
  @Column()
  supermarket?: string;
  @OneToMany(() => ProductToList, (productToList) => productToList.product)
  public productToList!: ProductToList[];
}
