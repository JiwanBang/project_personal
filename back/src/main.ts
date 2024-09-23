import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as filestore from 'session-file-store';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['*'],
      credentials: true,
    } as CorsOptions,
  });
  const Filestore = filestore(session);
  // app.enableCors({
  //   origin: ['http://localhost:3000'],
  //   credentials: true,
  // });

  // nestjs에서 import 시 import * as ~ 로 호출하기!
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'project',
      name: 'user',
      store: new Filestore({
        retries: 1,
        reapInterval: 1000,
        path: './user_session',
      }),
      cookie: {
        maxAge: 20 * 60 * 1000,
      },
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(3080);
}
bootstrap();
