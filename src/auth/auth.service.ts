import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import {RegisterDto} from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: RegisterDto): Promise<{ message: string }> {
    const existingUser: UserEntity = await this.userService.findOne(user.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    user.password = await bcrypt.hash(user.password, 10);

    await this.userService.create(user);

    return { message: 'User registered successfully' };
  }
}
