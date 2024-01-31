import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { verify } from '../../utils/encrypt';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
    private cacheService: CacheService,
  ) {}
  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { name },
      select: ['name', 'password', 'role', 'id'],
    });
    if (user) {
      const pass = await verify(user.password, password);
      if (pass) {
        return user;
      }
    }

    return null;
  }

  async login(userinfo) {
    const { id, name, role } = userinfo;
    const payload = {
      id,
      name,
      role,
    };
    const token = this.jwtService.sign(payload);
    this.cacheService.setCache(`${id}&${name}&${role}`, token, 30 * 60);
    return {
      access_token: token,
    };
  }

  async signUp(userInfo: UpdateUserDto) {
    const userInfoCopy = { ...userInfo };
    userInfoCopy.name = userInfo.name;
    userInfoCopy.sex = userInfo.sex || 0;
    userInfoCopy.venueId = userInfo.venueId || -1;
    userInfoCopy.role = userInfo.role || 1;
    return this.userService.create(userInfoCopy as CreateUserDto);
  }

  async signout(userInfo: { id: number; name: string; role: number }) {
    const { id, name, role } = userInfo;
    await this.cacheService.delCache(`${id}&${name}&${role}`);
    return null;
  }
}
