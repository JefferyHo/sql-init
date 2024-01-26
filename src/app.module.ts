import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { PhotoModule } from './modules/photo/photo.module';
import { VenueModule } from './modules/venue/venue.module';
import { UploadModule } from './modules/upload/upload.modules';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { ScheduleDetailModule } from './modules/schedule-detail/schedule-detail.module';
import * as express from 'express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456aa',
      database: 'test',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CourseModule,
    PhotoModule,
    VenueModule,
    UploadModule,
    ScheduleModule,
    ScheduleDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        express.json(),
        express.urlencoded({ extended: true }),
        LoggerMiddleware,
      )
      .forRoutes('*');
  }
}
