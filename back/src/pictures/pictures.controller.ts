import { Controller, Get, Param } from '@nestjs/common';
import { PicturesService } from './pictures.service';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly pictureService: PicturesService) {}

  @Get()
  findPic() {
    return this.pictureService.findPic();
  }

  @Get(':id')
  findPostPic(@Param('id') id: string) {
    return this.pictureService.findPostPic(+id);
  }
}
