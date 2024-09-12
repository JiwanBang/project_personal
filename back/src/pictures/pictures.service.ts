import { Injectable } from '@nestjs/common';
import { Pictures } from './pictues.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Pictures)
    private pictureRepository: Repository<Pictures>,
  ) {}

  async findPic() {
    // const findURL = await this.pictureRepository
    //   .createQueryBuilder('pictures')
    //   .leftJoinAndSelect('pictures.post', 'post')
    //   .groupBy('post.id')
    //   .orderBy('pictures.id', 'DESC')
    //   .limit(10)
    //   .getMany();

    // console.log(findURL);

    // return findURL;

    const findURL = await this.pictureRepository.find({
      relations: ['post'],
      take: 5,
      order: { id: 'desc' },
    });
    console.log(findURL);
    return findURL;
  }

  async findPostPic(id: number) {
    const findPost = await this.pictureRepository.find({
      where: { post: { id: id } },
    });
    return findPost;
  }
}
