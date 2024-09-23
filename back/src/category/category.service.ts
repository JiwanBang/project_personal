import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private cateRepository: Repository<Category>,
  ) {}

  async findAll() {
    const category = await this.cateRepository.find({});
    return category;
  }

  async create_category(category: Category) {
    const write = await this.cateRepository.create(category);
    try {
      await this.cateRepository.save(write);
      return { message: 'upload complete' };
    } catch (error) {
      throw new UnauthorizedException('posting failed');
    }
  }

  async headerCate() {
    const category = await this.cateRepository.find({
      take: 5,
      order: {
        id: 'asc',
      },
    });
    if (!category) throw new UnauthorizedException('fail load headerCate');
    return category;
  }
}
