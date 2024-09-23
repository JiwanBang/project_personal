import { User } from '../../user/user.entity';
import { Comment } from '../../comment/comment.entity';
import { Pictures } from '../../pictures/pictues.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/category.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 1000 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn()
  writer: User;

  @ManyToOne((type) => Category, (category) => category.id)
  @JoinColumn()
  boardCate: Category;

  @OneToMany(() => Pictures, (pictures) => pictures.post)
  post: Pictures[];

  @OneToMany(() => Comment, (comment) => comment.board)
  board: Comment[];
}
