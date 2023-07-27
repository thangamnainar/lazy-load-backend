import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Images, Video } from 'src/video/entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {

  constructor (
    @InjectRepository(Video)
    private readonly VideoRepository: Repository<Video>,
    @InjectRepository(Images)
    private readonly ImagesRepository: Repository<Images>,

  ){ }

  async saveImageKey(name:string,key:string) {
    return await this.ImagesRepository.save({name:name, imageKey:key})
  }

  async getImage(id:any) {
    return await this.ImagesRepository.findOne({select:['id','name','imageKey'],where:{id:id}})
  }

  async getAllImagesKeys(){
    return await this.ImagesRepository.find({select:['id','name','imageKey']})
  } 

}
