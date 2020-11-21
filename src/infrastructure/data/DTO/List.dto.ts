import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ProductToList } from './ProductToList.dto';
import { User } from './User.dto';

@Entity('list')
export class List {
  @PrimaryColumn()
  id?: string;
  @Column()
  title?: string;
  @ManyToMany(() => User)
  @JoinTable()
  users?: User[];
  @Column()
  status?: string;
  @Column({ type: 'date' })
  creation?: Date;
  @OneToMany(() => ProductToList, (productToList) => productToList.list)
  products!: ProductToList[];
}
