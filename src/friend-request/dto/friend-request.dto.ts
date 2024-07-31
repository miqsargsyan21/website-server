import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFriendRequestDto {
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;
}
