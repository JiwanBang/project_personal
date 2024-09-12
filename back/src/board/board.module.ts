import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { User } from '../user/user.entity';
import { AwsModule } from '../aws/aws.module';
import { UtilsModule } from '../utils/utils.module';
import { Pictures } from '../pictures/pictues.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User, Pictures]),
    UtilsModule,
    AwsModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
