import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';
import { Like, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue) private venueRepository: Repository<Venue>,
  ) {}

  async create(createVenueDto: CreateVenueDto) {
    const entity = plainToClass(Venue, createVenueDto);
    await this.venueRepository.save(entity);
    return null;
  }

  findAllWithKey(key: string, page: number, size: number) {
    return this.venueRepository
      .createQueryBuilder('venue')
      .where('venue.name LIKE :key', { key: `%${key}%` })
      .orWhere('venue.address LIKE :key', { key: `%${key}%` })
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
  }

  findAll(page: number, size: number) {
    return this.venueRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
  }

  async findOne(id: number) {
    const venue: Venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new BadRequestException('场馆不存在');
    }

    return venue;
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    const venue: Venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new BadRequestException('场馆不存在');
    }

    await this.venueRepository.update(id, updateVenueDto);
    return { id };
  }

  async remove(id: number) {
    const venue: Venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new BadRequestException('场馆不存在');
    }
    await this.venueRepository.softRemove(venue);

    return { id };
  }
}
