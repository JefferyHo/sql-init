import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDetailDto } from './create-schedule-detail.dto';

export class UpdateScheduleDetailDto extends PartialType(
  CreateScheduleDetailDto,
) {}
