import { IsDate, IsInt, IsOptional } from 'class-validator';
import { IsTimeFormat } from 'src/validators/time.validator';

export class CreateScheduleDetailDto {
  @IsOptional()
  readonly id: number;

  @IsOptional()
  readonly scheduleId: number;

  @IsInt()
  readonly coachId: number;

  @IsInt()
  readonly courseId: number;

  @IsTimeFormat()
  readonly startTime: string;

  @IsTimeFormat()
  readonly endTime: string;
}
