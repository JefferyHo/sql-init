import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { Venue } from '../venue/entities/venue.entity';
import { encrypt } from 'src/utils/encrypt';

interface UserJoinVenue extends User {
  venue: Venue;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByPhone(phone: string) {
    const user = await this.userRepository.findOneBy({ phone });

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const entity: User = await plainToClass(User, createUserDto);
    entity.password = await encrypt(entity.password || '123456');
    await this.userRepository.save(entity);
    return null;
  }

  async findByVenueId(id: number, role: number) {
    return this.userRepository.find({
      where: {
        role,
        venueId: id,
      },
    });
  }

  async findAll(page, size, key, role) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.venue', 'venue', 'v', 'v.id = user.venue_id');

    if (key) {
      queryBuilder
        .where('user.name LIKE :key', { key: `%${key}%` })
        .orWhere('user.phone LIKE :key', { key: `%${key}%` });
    }

    if (role > 0) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    const res = await queryBuilder
      .orderBy('user.updateTime', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
    const [list, total] = res as [UserJoinVenue[], number];
    console.log(queryBuilder.getQueryAndParameters());

    return [
      list.map(({ venue, ...rest }) => ({
        ...rest,
        venueName: venue?.name,
      })),
      total,
    ];
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('查无此人');
    }

    return user;
  }

  async update(id: number, updateuserDto: UpdateUserDto) {
    await this.findOne(id);
    await this.userRepository.update(id, updateuserDto);

    return null;
  }

  async remove(id: number) {
    const user: User = await this.findOne(id);

    await this.userRepository.softRemove(user);
    return null;
  }
}
