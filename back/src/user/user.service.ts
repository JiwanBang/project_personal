import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './userDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create_user(userDTO: UserDTO.registDTO) {
    const user = await this.userRepository.create(userDTO);
    return await this.userRepository.save(user);
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

  async logout() {}
}
