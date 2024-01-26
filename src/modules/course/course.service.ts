import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { plainToClass } from 'class-transformer';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const entity = plainToClass(Course, createCourseDto);
    await this.courseRepository.save(entity);
    return null;
  }

  findAll(page: number, size: number, key: string, venueId?: number) {
    const queryBuilder = this.courseRepository.createQueryBuilder('course');

    if (key) {
      queryBuilder.where('course.name LIKE :key', { key: `%${key}%` });
    }

    if (venueId) {
      queryBuilder.andWhere('course.venueId = :venueId', {
        venueId: `%${venueId}%`,
      });
    }

    return queryBuilder
      .orderBy('course.updateTime', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
  }

  findByVenueId(venueId: number): Promise<Course[]> {
    return this.courseRepository.find({
      // where: {
      //   venueId
      // }
    });
  }

  async findOne(id: number) {
    const course: Course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new BadRequestException('查询的课程不存在');
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);

    await this.courseRepository.update(id, updateCourseDto);

    return null;
  }

  async remove(id: number) {
    const course = await this.findOne(id);

    await this.courseRepository.softRemove(course);

    return null;
  }
}
