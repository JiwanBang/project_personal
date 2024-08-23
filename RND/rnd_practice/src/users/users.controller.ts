import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: Omit<User, 'id'>): User {
    return this.usersService.create(user);
  }

  @Get()
  findOne(
    @Body('user_id') user_id: string,
    @Body('password') password: string,
  ): User {
    return this.usersService.findOne(user_id, password);
  }

  @Delete()
  remove(@Param('id') id: number): void {
    this.usersService.remove(id);
  }
}
