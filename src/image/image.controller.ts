import { Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3serviceService } from 'src/s3service/s3service.service';
import { Request,Response } from 'express';
@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly s3Service: S3serviceService,
    ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image')) // Use the named import syntax
  async uploadVideo(@UploadedFile() image: Multer.File,@Res() res: Response,) {
    try {
      const fileKey = image.originalname;
      const fileBuffer = image.buffer;
      console.log('filekey', fileKey, image);
      console.log('fileBuffer', fileBuffer);
      const upload = await this.s3Service.uploadVideo(image.buffer, Date.now() + '_' + image.originalname, image.mimetype,);
      const saveImageKey = await  this.imageService.saveImageKey(image.name,upload.key)
      return res.status(HttpStatus.OK).json({ message: 'video uploaded', upload: upload.key, status: true });
    } catch (err) {
      console.log(err)

    }
    return 'Image uploaded successfully';
  }


  @Get('getImage/:id')
  async getImage(@Res() res: Response,@Req() req:Request ,@Param('id') id:string) {
    console.log('id',id);
    const getdata = await this.imageService.getImage(id);
    console.log('getdatagetdata', getdata);
    const imagekey = getdata.imageKey;
    const getImage = await this.s3Service.getAttachmentImage(imagekey);
    return res.status(HttpStatus.OK).json({ message: 'get data', data: getImage, status: true });
  }


  @Get('getAllKeys')
  async getAllKeys(@Res() res: Response){
    try{
      const getAllKeys = await this.imageService.getAllImagesKeys();
      return res.status(HttpStatus.OK).json({ message: 'getAllKeys', data: getAllKeys, status: true, });

    }catch (err){
      console.log('err',err);
    }
  }

}
