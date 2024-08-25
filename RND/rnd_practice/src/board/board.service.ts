import { Injectable } from '@nestjs/common';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  private boards: Board[] = [];
  private boardCounter = 1;

  findAll = (): Board[] => {
    return this.boards;
  };
  create = (board: Omit<Board, 'id'>) => {
    const newPost = {
      id: this.boardCounter++,
      ...board,
    };
    this.boards.push(newPost);
    return newPost;
  };
}
