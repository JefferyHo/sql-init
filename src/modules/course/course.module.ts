import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { VenueModule } from '../venue/venue.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), VenueModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
