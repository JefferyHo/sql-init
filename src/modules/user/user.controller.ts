import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isUseExisted = await this.userService.findByPhone(
      createUserDto.phone,
    );

    if (isUseExisted) {
      throw new BadRequestException('该手机号已注册');
    }
    return this.userService.create(createUserDto);
  }

  @Get()
  async findList(
    @Query('venueId') venueId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('key') key: string,
    @Query('role', ParseIntPipe) role: number,
  ) {
    if (!venueId) {
      const [list, total] = await this.userService.findAll(
        page,
        size,
        key,
        role,
      );
      return {
        list,
        total,
      };
    }
    return this.userService.findByVenueId(+venueId, role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isExistUser = await this.userService.findByPhone(updateUserDto.phone);

    if (isExistUser && isExistUser.id !== id) {
      throw new BadRequestException('该手机号已存在');
    }
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
