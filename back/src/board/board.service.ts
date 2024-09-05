import { Injectable, UnauthorizedException } from '@nestjs/common';
import { boardDTO } from './boardDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async create_board(board: Board) {
    const write = await this.boardRepository.create(board);
    try {
      await this.boardRepository.save(write);
    } catch (error) {
      throw new UnauthorizedException('posting failed');
    }
  }

  async findAll() {
    return await this.boardRepository.find();
  }

  async findBoard(boardCate: number) {
    return await this.boardRepository.find({ relations: ['boardCate'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, board: Board) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
