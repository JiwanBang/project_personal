import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Request } from 'express';
import { UtilsService } from '../utils/utils.service';
import { AwsService } from '../aws/aws.service';
import { Pictures } from '../pictures/pictues.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Pictures)
    private pictureRepository: Repository<Pictures>,
    private utilsService: UtilsService,
    private awsService: AwsService,
  ) {}

  async create_board(board: Board, req: Request) {
    try {
      const userId = req.session.user;
      if (userId) {
        console.log('userId는?' + userId);
        const writer = await this.userRepository.findOne({
          where: { id: userId },
        });

        if (!writer) {
          throw new HttpException('작성자를 확인할 수 없습니다', 299);
        } else {
          const write = await this.boardRepository.create({
            ...board,
            writer: writer,
          });
          const newPost = await this.boardRepository.save(write);
          console.log('save 한 값 ' + newPost);
          return { newPost, message: 'upload complete', status: 210 };
        }
      } else if (!userId) {
        throw new HttpException('로그인이 필요합니다', 214);
      }
    } catch (error) {
      throw new UnauthorizedException('posting failed');
    }
  }

  async findAll() {
    return await this.boardRepository.find({
      relations: ['boardCate'],
      where: { deletedAt: null },
      take: 10,
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findBoard(paramId: number) {
    console.log(paramId);
    const category = await this.boardRepository.find({
      relations: ['boardCate', 'writer'],
      where: { boardCate: { id: paramId } },
    });
    if (!category) throw new UnauthorizedException('fail load Board');
    return category;
  }

  async findWriter(paramId: number) {
    const USER = await this.boardRepository.find({
      relations: ['writer'],
      where: { writer: { id: paramId } },
    });
    if (!USER) throw new UnauthorizedException('fail load Post list');
    return USER;
  }

  async findOne(id: number) {
    const findOne = await this.boardRepository.find({
      relations: ['writer', 'boardCate', 'post'],
      where: { id: id },
    });
    if (!findOne) throw new UnauthorizedException('fail find post');
    return findOne;
  }

  async update(id: number, board: Board) {
    const post = await this.boardRepository.findOne({ where: { id: id } });
    const newPost = { ...post, ...board };
    try {
      await this.boardRepository.save(newPost);
      return { message: 'Upload complete' };
    } catch (error) {
      throw new UnauthorizedException('Update failed');
    }
  }

  async remove(id: number) {
    const post = await this.boardRepository.findOne({ where: { id: id } });
    try {
      await this.boardRepository.softDelete(id);
      return { message: 'Delete complete' };
    } catch (error) {
      throw new UnauthorizedException('Delete failed');
    }
  }

  async saveImage(files: Express.Multer.File[], postId: number) {
    console.log('saveImage 진행중');
    console.log('FormData:' + files);
    const upload = Promise.all(
      files.map((file) => this.imageUpload(file, postId)),
    );

    console.log(upload);
    return upload;
  }

  async imageUpload(file: Express.Multer.File, postId: number) {
    console.log('imageUpload 진행중');
    const imageName = this.utilsService.getUUID();
    const ext = file.originalname.split('.').pop();

    const imgUrl = await this.awsService.imageUploadToS3(
      `${imageName}.${ext}`,
      file,
      ext,
    );
    const post = await this.boardRepository.findOne({ where: { id: postId } });
    const saveUrl = await this.pictureRepository.save({
      img_url: imgUrl,
      post: post,
    });

    console.log('이미지업로드 종료.');
    console.log(imgUrl);
    console.log(saveUrl);

    return { saveUrl };
  }
}
