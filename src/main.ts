import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestExceptionFilter } from './filters/request-exception.filter';
import { RequestInterceptorInterceptor } from './interceptors/request-interceptor.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RequestExceptionFilter());
  app.useGlobalInterceptors(new RequestInterceptorInterceptor());
  app.setGlobalPrefix('api');

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
