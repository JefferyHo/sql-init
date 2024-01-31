import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
// import { PhotoModule } from './modules/photo/photo.module';
import { VenueModule } from './modules/venue/venue.module';
import { UploadModule } from './modules/upload/upload.modules';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { ScheduleDetailModule } from './modules/schedule-detail/schedule-detail.module';
import * as express from 'express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from './modules/cache/cache.module';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: +configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true,
      }),
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => ({
        type: 'single',
        url: `redis://${configService.get('REDIS_HOST')}:${configService.get(
          'REDIS_PORT',
        )}`,
        options: {
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.MYSQL_HOST,
    //   port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    //   username: process.env.MYSQL_USERNAME,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DATABASE,
    //   entities: [__dirname + '/**/*.entity.{js,ts}'],
    //   synchronize: true,
    // }),
    UserModule,
    AuthModule,
    CourseModule,
    // PhotoModule,
    VenueModule,
    UploadModule,
    ScheduleModule,
    ScheduleDetailModule,
    CacheModule,
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
