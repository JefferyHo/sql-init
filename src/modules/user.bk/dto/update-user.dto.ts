import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  readonly username: string;

  @ApiProperty({ description: '昵称' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  readonly nickname: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: '头像' })
  @IsOptional()
  @IsString()
  readonly avatar: string;

  @ApiProperty({ description: '邮箱' })
  @IsOptional()
  @IsEmail()
  readonly email: string;
}
