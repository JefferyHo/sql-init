import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

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
  signIn(@Body() userinfo: LoginUserDto) {
    return this.authService.login(userinfo);
  }
}
