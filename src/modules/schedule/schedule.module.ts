import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entity/schedule.entity';
import { ScheduleDetail } from '../schedule-detail/entities/schedule-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, ScheduleDetail])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
