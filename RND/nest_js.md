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

- nest는 프로젝트 생성할때마다 .git이 같이 생성되니 지워주기!

-response로 CRUD 패턴 자동생성 가능!

```bash
nest g res 모듈명
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
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [],
      synchronize: true,
      // 배포 시 synchronize는 false
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

- 데이터베이스 관련은 repository를 새로 만들어서 의존성 주입

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

### DTO

- Data Transfer Object, 프로세스 간 데이터를 전달하는 객체
- 클라이언트와 서버가 데이터를 주고받을 때 사용하는 객체

### pipe

- @Injectable() 데코레이터로 주석이 달린 클래스
  data-transformation과 data validation을 위해 사용

```bash
npm i class-validator
npm i class-transformer
```

- data validator: 데이터 유효성 체크. 입력한 데이터를 평가하고, 유효한 경우 그대로 전달. 유효하지 않다면 예외를 발생시킨다.
- data transformer: 입력 데이터를 원하는 형식으로 변환하는 것.
  ex: string "7" => integer 7

### DI(Dependency Injection)

- findall, findone, create, update, delete... 등등은 인자, 조건만 다르고 사용하는 함수는 매번 동일 => 굳이 매번 새로 쓸 필요가 없으므로, 해당 함수들을 미리 만들어 두고 사용할 때마다 의존성 주입으로 사용
- 보통 @injectable 데코레이터를 통해 공급자(prodiver)를 정함
