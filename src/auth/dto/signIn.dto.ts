import { IsString, IsEmail, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsString()
  password: string;
}
