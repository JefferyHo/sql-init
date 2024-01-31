import { Body, Controller, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

interface UserInfoInner {
  id: number;
  name: string;
  role: number;
}

@ApiTags('开始')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录
   * @param { object } userinfo
   * @return { null | string } token
   * */
  @ApiOperation({ summary: '登录' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() userinfo: UserInfoInner, @Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * 注册
   * @param { object } userinfo
   * @return { boolean }
   * */
  @ApiOperation({ summary: '注册' })
  @Post('signUp')
  signUp(@Body() userInfo: UpdateUserDto) {
    return this.authService.signUp(userInfo);
  }

  /**
   * 登出
   * @param { number } userid
   * @return { boolean }
   */
  @ApiOperation({ summary: '登出' })
  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@Body() userinfo: UserInfoInner) {
    return this.authService.signout(userinfo);
  }
}
