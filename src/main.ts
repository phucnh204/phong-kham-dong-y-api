import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  //app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(
    '/assets/images',
    express.static(join(__dirname, '..', 'public/assets/images')),
  );
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();
