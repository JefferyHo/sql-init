import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  // @IsEnum(user.Sex)
  @ApiProperty({ description: '性别(0-男, 1-女）' })
  @IsNumber()
  readonly sex: number;

  @ApiProperty({ description: '年龄' })
  @IsInt()
  @Min(0)
  @Max(200)
  readonly age: number;
}
