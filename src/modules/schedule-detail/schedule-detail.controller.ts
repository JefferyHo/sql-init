import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduleDetailService } from './schedule-detail.service';
import { CreateScheduleDetailDto } from './dto/create-schedule-detail.dto';
import { UpdateScheduleDetailDto } from './dto/update-schedule-detail.dto';

@Controller('schedule-detail')
export class ScheduleDetailController {
  constructor(private readonly scheduleDetailService: ScheduleDetailService) {}

  @Post()
  create(@Body() createScheduleDetailDto: CreateScheduleDetailDto) {
    return this.scheduleDetailService.create(createScheduleDetailDto);
  }

  @Get()
  findAll() {
    return this.scheduleDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDetailDto: UpdateScheduleDetailDto,
  ) {
    return this.scheduleDetailService.update(+id, updateScheduleDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleDetailService.remove(+id);
  }
}
