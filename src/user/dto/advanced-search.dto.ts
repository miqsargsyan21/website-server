import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {UserEntity} from "../user.entity";

export class AdvancedSearchDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(6)
  age?: number;
}

export type UserResponseDTO = Omit<UserEntity, 'password' | 'createdAt' | 'updatedAt'>;