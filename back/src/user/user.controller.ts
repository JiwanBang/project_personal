import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './userDTO';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('regist')
  async create_user(@Body() userDTO: UserDTO.registDTO) {
    const { user_id, nickname, phone_num } = userDTO;
    const dup_id = await this.userService.find_userId(user_id);
    const dup_nick = await this.userService.find_nickname(nickname);
    const dup_phoneNum = await this.userService.find_phoneNum(phone_num);

    if (dup_id) {
      throw new ConflictException('이미 사용중인 아이디입니다');
    }
    if (dup_nick) {
      throw new ConflictException('이미 사용중인 닉네임입니다');
    }
    if (dup_phoneNum) {
      throw new ConflictException('이미 사용중인 휴대폰 번호입니다');
    }
    const createUser = await this.userService.create_user(userDTO);

    return '회원 가입이 완료되었습니다!';
  }

  @Post()
  async login(@Body() userDTO: UserDTO.login, @Req() req: Request) {
    return this.userService.login(userDTO, req);
  }

  @Get()
  async logout(@Req() request: Request) {
    request.session.destroy;
  }
}
