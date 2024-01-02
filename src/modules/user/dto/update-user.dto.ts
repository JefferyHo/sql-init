import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  readonly name: string;
  @IsOptional()
  readonly sex: number;
  @IsOptional()
  readonly age: number;
}
