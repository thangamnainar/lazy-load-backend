import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images, Video } from 'src/video/entities/video.entity';
import { S3serviceService } from 'src/s3service/s3service.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Video,
      Images
    ])
  ],
  controllers: [ImageController],
  providers: [ImageService,S3serviceService]
})
export class ImageModule {}
