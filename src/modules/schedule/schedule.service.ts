import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entity/schedule.entity';
import { DataSource, Repository } from 'typeorm';
import { ScheduleDetail } from '../schedule-detail/entities/schedule-detail.entity';
import { plainToClass } from 'class-transformer';
import { CreateScheduleDetailDto } from '../schedule-detail/dto/create-schedule-detail.dto';
import { UpdateScheduleDetailDto } from '../schedule-detail/dto/update-schedule-detail.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(ScheduleDetail)
    private readonly scheduleDetailRepository: Repository<ScheduleDetail>,
    private dataSource: DataSource,
  ) {}

  async checkExist(venueId: number, date: Date) {
    const existSchedule: Schedule = await this.scheduleRepository.findOneBy({
      venueId,
      date,
    });

    if (existSchedule) {
      return existSchedule.id;
    }

    return null;
  }

  async create(createScheduleDto: CreateScheduleDto) {
    const existId = await this.checkExist(
      createScheduleDto.venueId,
      createScheduleDto.date,
    );
    if (existId) {
      throw new BadRequestException(
        `当前门店${createScheduleDto.date}已有课程安排`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { detail, ...rest } = createScheduleDto;

    try {
      const entity = plainToClass(Schedule, rest);
      const savedSchedule: Schedule = await queryRunner.manager.save(
        Schedule,
        entity,
      );

      const detailEntities = detail.map((detailDto: CreateScheduleDetailDto) =>
        plainToClass(ScheduleDetail, {
          ...detailDto,
          scheduleId: savedSchedule.id,
        }),
      );
      await queryRunner.manager.save(ScheduleDetail, detailEntities);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
    return null;
  }

  async findAll(page: number, size: number, key: number) {
    const queryBuilder = this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndMapOne(
        'schedule.venue',
        'venue',
        'v',
        'v.id = schedule.venue_id',
      );

    if (key > 0) {
      queryBuilder.where('schedule.venueId = :key', { key });
    }

    const res = await queryBuilder
      .orderBy('schedule.updateTime', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    console.log(queryBuilder.getQuery());

    const [list, total] = res;

    return {
      list: list.map((ll: any) => {
        ll.venueName = ll.venue?.name;
        ll.venue = undefined;
        return ll;
      }),
      total,
    };
  }

  async findOne(id: number) {
    const one: Schedule = await this.scheduleRepository.findOneBy({ id });
    const detail: ScheduleDetail[] = await this.scheduleDetailRepository.findBy(
      {
        scheduleId: one.id,
      },
    );

    // const qb =
    //   this.scheduleDetailRepository.createQueryBuilder('schedule_detail');

    // const res = await Promise.all(
    //   detail.map(async (dd: ScheduleDetail) => {
    //     qb.where('schedule_detail.id = :id', { id: dd.id });
    //     qb.leftJoinAndMapOne(
    //       'schedule_detail.coach',
    //       'coach',
    //       'coach',
    //       `coach.id = ${dd.coachId}`,
    //     );
    //     qb.leftJoinAndMapOne(
    //       'schedule_detail.course',
    //       'course',
    //       'course',
    //       `course.id = ${dd.courseId}`,
    //     );
    //     const res = await qb.select(['coach.name', 'course.name']).getRawOne();

    //     return {
    //       ...dd,
    //       coachName: res['coach_name'],
    //       courseName: res['course_name']
    //     };
    //   }),
    // );

    return {
      ...one,
      detail,
    };
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const connection = this.scheduleRepository.manager.connection;
    await connection.transaction(async (transactionalEntityManager) => {
      const { detail, ...rest } = updateScheduleDto;
      const entity = plainToClass(Schedule, rest);
      await transactionalEntityManager.update(Schedule, id, entity);

      await Promise.all(
        detail.map((detailDto: UpdateScheduleDetailDto) =>
          transactionalEntityManager.update(
            ScheduleDetail,
            detailDto.id,
            detailDto,
          ),
        ),
      );
    });
    return null;
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const scheduleDetailList: ScheduleDetail[] =
        await queryRunner.manager.find(ScheduleDetail, {
          where: {
            scheduleId: id,
          },
        });
      await queryRunner.manager.delete(ScheduleDetail, scheduleDetailList);
      await queryRunner.manager.delete(Schedule, id);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
    return null;
  }
}
