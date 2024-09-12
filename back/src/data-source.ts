import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Board } from './board/entities/board.entity';
import { User } from './user/user.entity';
import { Category } from './category/category.entity';

config();

const configService = new ConfigService();

export const dataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [Board, User, Category],
  migrationsRun: false,
  migrations: [__dirname + '/**/migrations/*.{js, ts}'],
  migrationsTableName: 'migrations',
  synchronize: false,
});
