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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建' })
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

  @ApiOperation({ summary: '查询' })
  @ApiParam({
    name: 'venueId',
    type: String,
    description: '指定门店查询，也可以不指定',
    required: false,
  })
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

  @ApiOperation({ summary: '按照ID查询' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: '更新' })
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

  @ApiOperation({ summary: '删除' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
