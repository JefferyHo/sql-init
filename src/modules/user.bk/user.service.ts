import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const entity = plainToClass(User, createUserDto);
    await this.userRepository.save(entity);
    return null;
  }

  async findAll() {
    return await this.userRepository.find({ withDeleted: false });
  }

  async findOne(id: number) {
    const user: User = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findUserExistByName(username: string) {
    const user: User = await this.userRepository.findOneBy({ username });

    return !!user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = await this.findOne(id);

    if (!user) return;

    await this.userRepository.update(id, updateUserDto);

    return { id };
  }

  async del(id: number) {
    const user: User = await this.findOne(id);

    await this.userRepository.softRemove(user);

    return { id };
  }
}
