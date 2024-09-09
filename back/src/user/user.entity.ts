import { Board } from '../board/entities/board.entity';
import { Comment } from '../comment/comment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['user_id', 'phone_num', 'nickname'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ unique: true })
  phone_num: string;

  @Column({ default: false })
  kakao_login_linked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Board, (board) => board.writer)
  writer: Board[];

  @OneToMany(() => Comment, (comment) => comment.commenter)
  commenter: Comment[];
}
