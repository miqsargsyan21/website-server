export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}
