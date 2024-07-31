import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { FriendRequestEntity } from './friend-request.entity';
import { UserEntity } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {CreateFriendRequestDto} from "./dto/friend-request.dto";

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequestEntity)
    private friendRequestRepository: Repository<FriendRequestEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<FriendRequestEntity[]> {
    return this.friendRequestRepository.find();
  }

  async add(params: CreateFriendRequestDto){
    const {
      senderId,
      receiverId,
    } = params;

    if (senderId === receiverId) {
      throw new ConflictException('Users are the same')
    }

    const sender: UserEntity = await this.userRepository.findOne({where: {id: receiverId}});
    const receiver: UserEntity = await this.userRepository.findOne({where: {id: senderId}});

    if (!receiver) {
      throw new NotFoundException('Receiver not found')
    }

    await this.friendRequestRepository.save({sender, receiver})

    return { message: 'Friend request successfully sent.' };
  }

  async accept(params: CreateFriendRequestDto){
    const {
      senderId,
      receiverId,
    } = params;

    if (senderId === receiverId) {
      throw new ConflictException('Users are the same')
    }

    const friendRequest = await this.friendRequestRepository.findOne({where: {sender: {id: senderId}, receiver: {id: receiverId}} as FriendRequestEntity});

    if (!friendRequest) {
      throw new NotFoundException('Friend request not found');
    }

    if (friendRequest.status !== 'pending') {
      throw new ConflictException('Friend request status already has been changed.')
    }

    friendRequest.status = 'accepted';
    await this.friendRequestRepository.save(friendRequest);

    return 'Friend request successfully accepted.';
  }

  async decline(params: CreateFriendRequestDto){
    const {
      senderId,
      receiverId,
    } = params;

    if (senderId === receiverId) {
      throw new ConflictException('Users are the same')
    }

    const friendRequest = await this.friendRequestRepository.findOne({where: {sender: {id: senderId}, receiver: {id: receiverId}} as FriendRequestEntity});

    if (!friendRequest) {
      throw new NotFoundException('Friend request not found');
    }

    if (friendRequest.status !== 'pending') {
      throw new ConflictException('Friend request status already has been changed.')
    }

    friendRequest.status = 'declined';
    await this.friendRequestRepository.save(friendRequest);

    return 'Friend request successfully declined.';
  }
}
