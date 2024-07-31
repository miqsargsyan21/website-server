import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import {CreateFriendRequestDto} from "./dto/friend-request.dto";

@Controller('api/friends')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Get('requests')
  findAll() {
    return this.friendRequestService.findAll();
  }

  @Post('add')
  add(@Req() req, @Body() body: {receiverId: number}) {
    const params: CreateFriendRequestDto = {
      senderId: req.user.id,
      receiverId: body.receiverId,
    }

    return this.friendRequestService.add(params);
  }

  @Post('accept')
  accept(@Req() req, @Body() body: {receiverId: number}) {
    const params: CreateFriendRequestDto = {
      senderId: req.user.id,
      receiverId: body.receiverId,
    }

    return this.friendRequestService.accept(params);
  }

  @Post('decline')
  decline(@Req() req, @Body() body: { receiverId: number }) {
    const params: CreateFriendRequestDto = {
      senderId: req.user.id,
      receiverId: body.receiverId,
    }

    return this.friendRequestService.decline(params);
  }
}
