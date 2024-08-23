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
npm i --save mysql typeorm @nestjs/typeorm
```
