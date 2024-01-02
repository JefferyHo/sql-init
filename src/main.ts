import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestExceptionFilter } from './filters/request-exception.filter';
import { RequestInterceptorInterceptor } from './interceptors/request-interceptor.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RequestExceptionFilter());
  app.useGlobalInterceptors(new RequestInterceptorInterceptor());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
