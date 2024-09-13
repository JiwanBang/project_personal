import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { AwsModule } from './aws/aws.module';
import { UtilsModule } from './utils/utils.module';
import { PicturesModule } from './pictures/pictures.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '/var/www/backend/.env',
    }),
    TypeOrmModule.forRootAsync({
      // forRoot -> forRootAsync로 변경
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    BoardModule,
    CategoryModule,
    CommentModule,
    AwsModule,
    UtilsModule,
    PicturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
