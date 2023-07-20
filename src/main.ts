import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  HttpExceptionFilter,
  TimeoutInterceptor,
  WrapResponseInterceptor,
} from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove any properties that are not in the DTO
      transform: true, // this will transform the payload to the DTO type
      forbidNonWhitelisted: true, // this will throw an error if there are properties that are not in the DTO
      transformOptions: {
        enableImplicitConversion: true, // this will transform the payload to the DTO type
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter()); // this will catch all the exceptions and return a custom response
  //app.useGlobalGuards(new ApiKeyGuard()); // this will apply the guards to all the routes
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  ); // this will apply the interceptors to all the routes
  await app.listen(3000);
}
bootstrap();
