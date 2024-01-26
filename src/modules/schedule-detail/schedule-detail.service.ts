import { Injectable } from '@nestjs/common';
import { CreateScheduleDetailDto } from './dto/create-schedule-detail.dto';
import { UpdateScheduleDetailDto } from './dto/update-schedule-detail.dto';

@Injectable()
export class ScheduleDetailService {
  create(createScheduleDetailDto: CreateScheduleDetailDto) {
    return 'This action adds a new scheduleDetail';
  }

  findAll() {
    return `This action returns all scheduleDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduleDetail`;
  }

  update(id: number, updateScheduleDetailDto: UpdateScheduleDetailDto) {
    return `This action updates a #${id} scheduleDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduleDetail`;
  }
}
