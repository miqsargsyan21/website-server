import { IUser } from '../user/user.interface';

export interface IFriendRequest {
  id: number;
  sender: IUser;
  receiver: IUser;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}
