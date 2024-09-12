import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/entities/board.entity';

@Entity()
export class Pictures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  img_url: string;

  @ManyToOne((type) => Board, (board) => board.id)
  @JoinColumn()
  post: Board;
}
