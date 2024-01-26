import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

enum Sex {
  MALE = 0,
  FEMALE = 1,
}

enum Role {
  VISITOR = 1,
  USER = 2,
  COACH = 3,
  MANAGER = 4,
}

export class CreateUserDto {
  @ApiProperty({ description: '名称' })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  readonly name: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @IsOptional()
  readonly nickname: string;

  @ApiProperty({
    description: '性别',
    enum: [0, 1],
    enumName: '0 - 男， 1 - 女',
  })
  @IsEnum(Sex)
  readonly sex: Sex;

  @ApiProperty({ description: '头像' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly avatar: string;

  @ApiProperty({ description: '电话' })
  @IsString()
  @MaxLength(20)
  readonly phone: string;

  @ApiProperty({ description: '邮箱' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: '简介' })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  readonly desc: string;

  @ApiProperty({ description: '所属场馆' })
  @IsNumber()
  readonly venueId: number;

  @ApiProperty({
    description: '角色',
    enum: [1, 2, 3, 4],
    enumName: '1-visitor, 2-user, 3-coach, 4-manager',
  })
  @IsEnum(Role)
  readonly role: Role;
}
