import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestExceptionFilter } from './filters/request-exception.filter';
import { RequestInterceptorInterceptor } from './interceptors/request-interceptor.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RequestExceptionFilter());
  app.useGlobalInterceptors(new RequestInterceptorInterceptor());
  app.setGlobalPrefix('api');
  app.useStaticAssets('static', { prefix: '/pages' });
  app.useStaticAssets('uploads', { prefix: '/uploads' });

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
