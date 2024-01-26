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
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Venue } from './entities/venue.entity';

@ApiTags('场馆')
@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @ApiOperation({ summary: '创建' })
  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @ApiOperation({ summary: '查询全部' })
  @Get()
  async findAll(
    @Query('key') key: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    let list: Venue[], total: number;
    if (key) {
      [list, total] = await this.venueService.findAllWithKey(key, page, size);
    } else {
      [list, total] = await this.venueService.findAll(page, size);
    }

    return {
      list,
      total,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(+id);
  }

  @ApiOperation({ summary: '更新' })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(+id, updateVenueDto);
  }

  @ApiOperation({ summary: '删除' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(+id);
  }
}
