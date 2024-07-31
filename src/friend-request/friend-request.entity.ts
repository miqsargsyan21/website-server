import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { IFriendRequest } from './friend-request.interface';

@Entity('friend_requests')
export class FriendRequestEntity implements IFriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.sentRequests)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.receivedRequests)
  receiver: UserEntity;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'declined';

  @CreateDateColumn()
  createdAt: Date;
}
