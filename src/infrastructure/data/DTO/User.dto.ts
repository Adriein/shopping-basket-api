import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

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
  @ManyToMany((type) => User)
  @JoinTable({
    name: 'followers',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id',
    },
  })
  followers?: User[];
}
