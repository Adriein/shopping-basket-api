import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductToList } from './ProductToList.dto';

@Entity('user')
export class User {
  @PrimaryColumn()
  id?: string;
  @Column({ name: 'public_id' })
  publicId?: string;
  @Column()
  username?: string;
  @Column()
  password?: string;
  @Column({ type: 'date' })
  creation?: Date;
}
