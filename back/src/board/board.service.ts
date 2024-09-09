import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/category.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Category)
    private cateRepository: Repository<Category>,
  ) {}

  async create_board(board: Board) {
    const write = await this.boardRepository.create(board);
    try {
      await this.boardRepository.save(write);
      return { message: 'upload complete' };
    } catch (error) {
      throw new UnauthorizedException('posting failed');
    }
  }

  async findAll() {
    return await this.boardRepository.find({
      relations: ['boardCate'],
      where: { deletedAt: null },
      take: 10,
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findBoard(paramId: number) {
    console.log(paramId);
    const category = await this.boardRepository.find({
      relations: ['boardCate', 'writer'],
      where: { boardCate: { id: paramId } },
    });
    if (!category) throw new UnauthorizedException('fail load Board');
    return category;
  }

  async findWriter(paramId: number) {
    const USER = await this.boardRepository.find({
      relations: ['writer'],
      where: { writer: { id: paramId } },
    });
    if (!USER) throw new UnauthorizedException('fail load Post list');
    return USER;
  }

  async findOne(id: number) {
    const findOne = await this.boardRepository.find({
      relations: ['writer', 'boardCate'],
      where: { id: id },
    });
    if (!findOne) throw new UnauthorizedException('fail find post');
    return findOne;
  }

  async update(id: number, board: Board) {
    const post = await this.boardRepository.findOne({ where: { id: id } });
    const newPost = { ...post, ...board };
    try {
      await this.boardRepository.save(newPost);
      return { message: 'Upload complete' };
    } catch (error) {
      throw new UnauthorizedException('Update failed');
    }
  }

  async remove(id: number) {
    const post = await this.boardRepository.findOne({ where: { id: id } });
    try {
      await this.boardRepository.softDelete(id);
      return { message: 'Delete complete' };
    } catch (error) {
      throw new UnauthorizedException('Delete failed');
    }
  }
}
