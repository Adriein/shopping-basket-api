import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './List.dto';
import { Product } from './Product.dto';
import { User } from './User.dto';

@Entity('user_to_friend')
export class UserToFriend {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  userId1!: string;

  @ManyToOne(() => User, (user) => user.id)
  userId2!: string;
}
