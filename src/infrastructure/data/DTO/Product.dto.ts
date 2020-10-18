import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
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
}
