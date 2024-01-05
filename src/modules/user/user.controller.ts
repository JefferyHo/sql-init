import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('用户中心')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建用户
   * @param post
   * */
  @ApiOperation({ summary: '创建用户' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const exist = await this.userService.findUserExistByName(
      createUserDto.name,
    );
    if (exist) {
      throw new BadRequestException('用户名已存在');
    }
    return this.userService.create(createUserDto);
  }

  /**
   * 获取所有用户
   * */
  @ApiOperation({ summary: '获取所有用户' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * 获取指定用户
   * @param { number } id
   */
  @ApiOperation({ summary: '获取指定用户' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id) {
    return this.userService.findOne(id);
  }

  /**
   * 更新用户信息
   * @param { number } id
   * @params post
   */
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id' })
  @Put(':id')
  update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * 逻辑删除用户
   * @param { number } id
   */
  @ApiOperation({ summary: '删除用户（逻辑删除）' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  del(@Param('id') id) {
    return this.userService.del(id);
  }
}
