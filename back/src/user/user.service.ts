import {
  HttpException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './userDTO';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create_user(userDTO: UserDTO.registDTO) {
    const { user_id, nickname, password, phone_num } = userDTO;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userRepository.create({
      ...userDTO,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new UnauthorizedException('regist failed');
    }
  }

  async find_userId(user_id: string) {
    return await this.userRepository.findOne({
      where: { user_id },
    });
  }

  async find_nickname(nickname: string) {
    return await this.userRepository.findOne({
      where: { nickname },
    });
  }
  async find_phoneNum(phone_num: string) {
    return await this.userRepository.findOne({
      where: { phone_num },
    });
  }

  async login(userDTO: UserDTO.login, req: Request) {
    const { id, user_id, password } = userDTO;
    const user = await this.userRepository.findOneBy({ user_id });
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(user.id);
      req.session;
      req.session.user = user.id;
      return { message: 'login success' };
    } else {
      throw new HttpException('failed to login', 299);
    }
  }

  async logout() {}

  async logCheck(req: Request) {
    if (!req.session) {
      throw new HttpException('not logined', 218);
    } else if (req.session) {
      return { id: req.session.user };
    }
  }
}
