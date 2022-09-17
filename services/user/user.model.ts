import { Schema, model } from 'mongoose';
import { UserDocument } from '../../utils/types/user.type';

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true,
    unique: false
  },
  createdOn: {
    type: Date,
    default: new Date()
  }
});

const userModel = model<UserDocument>('user', userSchema);
export default userModel;
