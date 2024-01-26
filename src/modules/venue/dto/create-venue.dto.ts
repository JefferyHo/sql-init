import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateVenueDto {
  @ApiProperty({ description: '场馆名' })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  readonly name: string;

  @ApiProperty({ description: '场馆封面图' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly cover: string;

  @ApiProperty({ description: '地址' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly address: string;
}
