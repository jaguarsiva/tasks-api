import { Document } from 'mongoose';
import { makeUser } from '../../entities/index';

export interface UserPayload {
  username: string;
  fullname: string;
  password: string;
}

export interface User extends UserPayload {
  id: string;
  createdOn: Date;
}

export interface UserDocument extends User, Document {
  id: string;
}
export type MakeUser = typeof makeUser;
