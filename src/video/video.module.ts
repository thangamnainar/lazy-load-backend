import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { S3serviceService } from 'src/s3service/s3service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images, Video } from './entities/video.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([
      Video,
      Images
    ])
  ],
  controllers: [VideoController],
  providers: [VideoService,S3serviceService]
})
export class VideoModule {}
