import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名', required: false })
  @IsOptional()
  readonly name: string;

  @ApiProperty({ description: '性别', required: false })
  @IsOptional()
  readonly sex: number;

  @ApiProperty({ description: '年龄', required: false })
  @IsOptional()
  readonly age: number;
}
