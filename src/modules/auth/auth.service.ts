import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'src/utils/encrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['username', 'password'],
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
    const payload = { username: userinfo.username, sub: 'check out' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
