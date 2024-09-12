import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  s3Client: S3Client;

  constructor(private configService: ConfigService) {
    // AWS S3 클라이언트 초기화. 환경 설정 정보를 사용하여
    // AWS 리전, Access Key, Secret Key를 설정.

    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  async imageUploadToS3(
    fileName: string,
    file: Express.Multer.File,
    ext: string,
  ) {
    console.log('imageUploadToS3 시작');
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: fileName, // 업로드할 파일의 이름
      Body: file.buffer, // 업로드할 파일
      ACL: 'public-read', // 파일 접근 권한
      ContentType: `image/${ext}`, //파일 타입
    });

    await this.s3Client.send(command);

    return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${fileName}`;
  }
}
