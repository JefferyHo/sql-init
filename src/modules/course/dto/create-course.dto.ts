import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Venue } from 'src/modules/venue/entities/venue.entity';
import { Entity } from 'typeorm';

enum Type {
  GROUP = 0,
  PREMIUN = 1,
  PRIVATE = 2,
}

@Entity()
export class CreateCourseDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  readonly level: number;

  @IsInt()
  @Min(1)
  @Max(100)
  readonly capacity: number;

  @IsNumber()
  @Min(0)
  @Max(12 * 60)
  readonly duration: number;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  readonly desc: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly cover: string;

  @IsEnum(Type)
  readonly type: number;

  @IsInt()
  @IsOptional()
  coachId: number;

  @IsInt()
  @IsOptional()
  readonly venueId: number;

  readonly venue: Venue;
}
