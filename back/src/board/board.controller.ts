import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() board: Board) {
    return this.boardService.create_board(board);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') paramId: string) {
    return this.boardService.findOne(+paramId);
  }

  @Get('/cate/:id')
  findBoard(@Param('id') id: string) {
    return this.boardService.findBoard(+id);
  }

  @Get('/writer/:id')
  findWriter(@Param('id') id: string) {
    return this.boardService.findWriter(+id);
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
