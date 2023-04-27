import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove any properties that are not in the DTO
      transform: true, // this will transform the payload to the DTO type
      forbidNonWhitelisted: true, // this will throw an error if there are properties that are not in the DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
