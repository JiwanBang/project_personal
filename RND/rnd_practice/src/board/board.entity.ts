import { writer } from 'repl';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  post: string;

  // @Column()
  // writer: number;

  @ManyToOne((type) => User, (user) => user.id)
  writer: User;
}
