import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {AdvancedSearchDto, UserResponseDTO} from "./dto/advanced-search.dto";
import {RegisterDto} from "../auth/dto/register.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserResponseDTO[]> {
    return this.transformUsers(await this.userRepository.find());
  }

  async findOne(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: RegisterDto): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async advancedSearch(query: AdvancedSearchDto): Promise<UserResponseDTO[]> {
    const options = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== undefined)
    ) as AdvancedSearchDto;

    return this.transformUsers(await this.userRepository.find({where: options}));
  }

  private transformUsers(users: UserEntity[]): UserResponseDTO[] {
    return users.map(userData => {
    const {
      password,
      createdAt,
      updatedAt,
      ...restData
    } = userData;

    return restData;
  });
  }
}
