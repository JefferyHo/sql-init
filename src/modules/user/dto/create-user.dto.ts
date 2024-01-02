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
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  // @IsEnum(user.Sex)
  @IsNumber()
  readonly sex: number;

  @IsInt()
  @Min(0)
  @Max(200)
  readonly age: number;
}
