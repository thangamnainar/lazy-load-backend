import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Images, Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService {

  constructor (
    @InjectRepository(Video)
    private readonly VideoRepository: Repository<Video>,
    @InjectRepository(Images)
    private readonly ImagesRepository: Repository<Images>,

  ){ }


  async saveVideoKey(name:string,key:string) {
    return await this.VideoRepository.save({name:name, videoKey:key})
  }



  async getVideo(id:any) {
    return await this.VideoRepository.findOne({select:['id','name','videoKey'],where:{id:id}})
  }

 

  async getAllVideoKeys(){
    return await this.VideoRepository.find({select:['id','name','videoKey']})
  }  



  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
