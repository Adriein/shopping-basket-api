import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Product } from './Product.dto';
import { User } from './User.dto';

@Entity('list')
export class List {
  @PrimaryColumn()
  id?: string;
  @Column()
  title?: string;
  @ManyToMany((type) => User)
  @JoinTable()
  users?: User[];
  @Column()
  status?: string;
  @Column()
  dateCreated?: Date;
  @ManyToMany((type) => Product)
  @JoinTable()
  products?: Product[];
}
