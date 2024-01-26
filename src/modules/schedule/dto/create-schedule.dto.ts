import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateScheduleDetailDto } from 'src/modules/schedule-detail/dto/create-schedule-detail.dto';
import { Entity } from 'typeorm';

@Entity()
export class CreateScheduleDto {
  @IsInt()
  readonly venueId: number;

  @IsDateString()
  readonly date: Date;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly desc: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleDetailDto)
  readonly detail: CreateScheduleDetailDto[];
}
