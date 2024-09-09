import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() category: Category) {
    return this.categoryService.create_category(category);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/cateHead')
  headerCate() {
    return this.categoryService.headerCate();
  }
}
