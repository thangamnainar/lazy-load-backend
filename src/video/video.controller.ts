import { Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3serviceService } from 'src/s3service/s3service.service';
import { Multer } from 'multer'
import { Response, Request } from 'express';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(
    private readonly s3Service: S3serviceService,
    private readonly vService:VideoService,
    ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('video')) // Use the named import syntax
  async uploadVideo(@UploadedFile() video: Multer.File,@Res() res: Response,) {
    try {
      const fileKey = video.originalname;
      const fileBuffer = video.buffer;
      console.log('filekey', fileKey, video);
      console.log('fileBuffer', fileBuffer);
      const upload = await this.s3Service.uploadVideo(video.buffer, Date.now() + '_' + video.originalname, video.mimetype,);
      const saveVideoKey = await  this.vService.saveVideoKey(video.name,upload.key)
      // const saveImageKey = await  this.vService.saveImageKey(video.name,upload.key)
      return res.status(HttpStatus.OK).json({ message: 'video uploaded', upload: upload.key, status: true });
    } catch (err) {
      console.log(err)

    }

    return 'Video uploaded successfully';
  }

  @Get('getVideo/:id')
  async getVideo(@Res() res: Response,@Req() req:Request ,@Param('id') id:string) {
    console.log('id',id);
    const getdata = await this.vService.getVideo(id);
    console.log('getdatagetdata', getdata);
    const videokey = getdata.videoKey;
    const getVideo = await this.s3Service.getAttachmentImage(videokey);
    // console.log('getV', getVideo);
    return res.status(HttpStatus.OK).json({ message: 'get data', data: getVideo, status: true });
  }


  @Get('getImage/:id')
  async getImage(@Res() res: Response,@Req() req:Request ,@Param('id') id:string) {
    console.log('id',id);
    const getdata = await this.vService.getImage(id);
    console.log('getdatagetdata', getdata);
    const imagekey = getdata.imageKey;
    const getVideo = await this.s3Service.getAttachmentImage(imagekey);
    // console.log('getV', getVideo);
    return res.status(HttpStatus.OK).json({ message: 'get data', data: getVideo, status: true });
  }


  @Get('getAllKeys')
  async getAllKeys(@Res() res: Response){
    try{
      const getAllKeys = await this.vService.getAllImagesKeys();
      return res.status(HttpStatus.OK).json({ message: 'getAllKeys', data: getAllKeys, status: true, });

    }catch (err){
      console.log('err',err);
    }
  }

  @Get('getAllVideoKeys')
  async getAllVideoKeys(@Res() res: Response){
    try{
      const getAllKeys = await this.vService.getAllVideoKeys();
      return res.status(HttpStatus.OK).json({ message: 'getAllKeys', data: getAllKeys, status: true, });

    }catch (err){
      console.log('err',err);
    }
  }
  
}
