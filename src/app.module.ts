import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { S3serviceService } from './s3service/s3service.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,   
      database: process.env.DATABASE_NAME,
      // synchronize: true,   
      autoLoadEntities: true,
    }),
    VideoModule
  ],
  controllers: [AppController],
  providers: [AppService, S3serviceService],
})
export class AppModule {

}
