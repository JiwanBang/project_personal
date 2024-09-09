import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../board/entities/board.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  category: string;

  @OneToMany(() => Board, (board) => board.boardCate)
  boardCate: Board[];
}
