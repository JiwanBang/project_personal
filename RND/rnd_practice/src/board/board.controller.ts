import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll(): Board[] {
    return this.boardService.findAll();
  }

  @Post('write')
  create(@Body() board: Omit<Board, 'id'>): Board {
    return this.boardService.create(board);
  }
}
