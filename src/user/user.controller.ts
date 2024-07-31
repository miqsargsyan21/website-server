import {Controller, Get, Query} from '@nestjs/common';
import { UserService } from './user.service';
import {AdvancedSearchDto, UserResponseDTO} from "./dto/advanced-search.dto";

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserResponseDTO[]> {
    return this.userService.findAll();
  }

  @Get('search')
  search(@Query() query: AdvancedSearchDto): Promise<UserResponseDTO[]> {
    return this.userService.advancedSearch(query);
  }
}