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
      // Custom Exception =>
      // NotFoundException => nest에서 error 보낼때 쓰는 코드
    } else if (user.password !== password) {
      throw new NotFoundException('비밀번호가 일치하지 않습니다');
    }
    return user;
  };

  create = (user: Omit<User, 'id'>): User => {
    const newUser = {
      id: this.idCounter++,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  };

  remove = (id: number): void => {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === 1) {
      throw new NotFoundException('아이디를 찾을 수 없습니다');
    }
    this.users.splice(index, 1);
  };
}
