import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn()
  commenter: User;

  @ManyToOne((type) => Board, (board) => board.id)
  @JoinColumn()
  board: Board;
}
