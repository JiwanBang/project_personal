import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { Request } from 'express';
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() board: Board, @Req() req: Request) {
    return this.boardService.create_board(board, req);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @Get('/cate/:id')
  findBoard(@Param('id') paramId: string) {
    return this.boardService.findBoard(+paramId);
  }

  @Get('/writer/:id')
  findWriter(@Param('id') paramId: string) {
    return this.boardService.findWriter(+paramId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() board: Board) {
    return this.boardService.update(+id, board);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
