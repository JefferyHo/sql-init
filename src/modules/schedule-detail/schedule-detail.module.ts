import { Module } from '@nestjs/common';
import { ScheduleDetailService } from './schedule-detail.service';
import { ScheduleDetailController } from './schedule-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleDetail } from './entities/schedule-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleDetail])],
  controllers: [],
  providers: [ScheduleDetailService],
})
export class ScheduleDetailModule {}
