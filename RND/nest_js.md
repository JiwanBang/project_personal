# Nest.js

## 네스트 JS 설치 및 실행

### 설치 및 생성

- 최초 설치

```bash
npm i -g @nestjs/cli
```

- 프로젝트 생성

```bash
nest new "프로젝트명"
npm
```

- 유저 모듈 생성

```bash
nest g mo users
```

- 유저 컨트롤러 생성

```bash
nest g co users
```

- 유저 서비스 생성

```bash
nest g s users
```

- cors 설정: nest 프로젝트 main.ts에서

```ts
app.enableCors();
```

추가

### 실행

- 기본 실행:

```bash
npm run start
```

- 변경 감지 서버 리부팅:

```bash
npm run start:dev
```

mysql typeorm 설치

```bash
npm i @nestjs/typeorm typeorm mysql2
```

- Nest.js에서는 dotenv 대신 @nestjs/config를 사용하므로
  nestjs/confog와 cross-env 설치

```bash
npm i -D @nestjs/config cross-env
mkdir src/config
```

- typeorm.config.service.ts 파일 생성

```js
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements
constructor(private readonly configService: ConfigService){}
TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('typeorm_test'),
      entities: [],
      synchronize: true,
    };
  }
}
```

- app.module.ts의 import에 내용 추가

```js
ConfigModule.forRoot({ isGlobal: true }),
TypeOrmModule.forRootAsync({
// forRoot -> forRootAsync로 변경
useClass: TypeOrmConfigService,
}),
```

- 정상적으로 DB 연결이 확인됐으면
  타입 선언한 Entity file 수정

수정 전:

```js
export class User {
  id: number;
  user_id: string;
  password: string;
  nickname: string;
  phone_num: string;
}
```

데코레이터를 붙여서 수정

```js
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  phone_num: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
```

- user.module.ts에 import 추가

```js
  imports: [TypeOrmModule.forFeature([User])],
```

- 데이터베이스 관련은 repository를 새로 만들어서 저장하는 것이 좋음

### 관계 맺기

- 1대 다

- one

```js
  @OneToMany(() => Board, (board) => board.writer)
  writer: Board[];
```

- many

```js
  @ManyToOne((type) => User, (user) => user.id)
  writer: User;
```
