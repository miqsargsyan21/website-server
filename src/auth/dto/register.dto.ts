import { IsString, IsInt, IsEmail, IsOptional, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastName: string;

  @IsInt()
  age: number;

  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  bio?: string;
}
