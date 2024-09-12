import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { User } from '../user/user.entity';
import { AwsModule } from '../aws/aws.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User]), UtilsModule, AwsModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
