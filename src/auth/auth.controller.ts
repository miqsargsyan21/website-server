import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Post,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { Public } from './auth.guard';
import {SignInDto} from "./dto/signIn.dto";
import {RegisterDto} from "./dto/register.dto";

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('user: ', registerDto)
    return this.authService.register(registerDto);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
