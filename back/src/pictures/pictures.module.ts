import { Module } from '@nestjs/common';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pictures } from './pictues.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pictures])],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
