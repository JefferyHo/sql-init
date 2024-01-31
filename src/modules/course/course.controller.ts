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
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { VenueService } from '../venue/venue.service';
import { Course } from './entities/course.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('课程')
@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly venueService: VenueService,
  ) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const venue = await this.venueService.findOne(createCourseDto.venueId);

    return this.courseService.create({
      ...createCourseDto,
      venue,
    });
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('key') key: string,
    @Query('venueId') venueId?: string,
  ): Promise<{ total: number; list: Course[] }> {
    const [list, total] = await this.courseService.findAll(
      page,
      size,
      key,
      venueId ? +venueId : undefined,
    );
    return {
      list,
      total,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
