import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as awsConfig } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true
  });

  awsConfig.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,       
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1"
  });

  await app.listen(3000);
}
bootstrap();
