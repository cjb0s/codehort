import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserInfoDto } from './dto/user-info.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  register(@Body() newUser: UserInfoDto): UserInfoDto {
    newUser = this.userService.createUser(newUser.username, newUser.password);
    return newUser;
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() user: UserInfoDto): string {
    return this.userService.loginUser(user.username, user.password);
  }

  @Post('logout')
  @HttpCode(200)
  logout(): string {
    return 'You have logged out. Goodbye';
  }
}
