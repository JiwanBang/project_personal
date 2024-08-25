import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  findAll = (): User[] => {
    return this.users;
  };

  findOne = (user_id: string, password: string): User => {
    const user = this.users.find((item) => item.user_id === user_id);

    if (!user) {
      throw new NotFoundException('아이디를 찾을 수 없습니다');
    } else if (user.password !== password) {
      throw new NotFoundException('비밀번호가 일치하지 않습니다');
    }
    return user;
  };

  create = (user: Omit<User, 'id'>): User => {
    const idIndex = this.users.findIndex(
      (item) => item.user_id === user.user_id,
    );
    const nickIndex = this.users.findIndex(
      (item) => item.nickname === user.nickname,
    );
    const phoneIndex = this.users.findIndex(
      (item) => item.phone_num === user.phone_num,
    );

    if (idIndex !== -1) {
      throw new NotFoundException('이미 있는 아이디입니다');
    } else if (nickIndex !== -1) {
      throw new NotFoundException('이미 있는 닉네임입니다');
    } else if (phoneIndex !== -1) {
      throw new NotFoundException('이미 있는 휴대폰입니다');
    } else {
      const newUser = {
        id: this.idCounter++,
        ...user,
      };
      this.users.push(newUser);
      return newUser;
    }
  };

  remove = (id: number): void => {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === 1) {
      throw new NotFoundException('아이디를 찾을 수 없습니다');
    }
    this.users.splice(index, 1);
  };
}
