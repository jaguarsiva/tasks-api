import { Model } from 'mongoose';
import { User, UserDocument } from '../../utils/types/user.type';

export default function makeUserService(model: Model<UserDocument, {}, {}>) {
  async function create(user: User) {
    const insertedUser = await model.create(user);
    return insertedUser;
  }

  async function findAll() {
    const users = await model.find({}, { _id: 0, __v: 0, password: 0 });
    return users;
  }

  async function findById(id: string) {
    const user = await model.findOne({ id }, { _id: 0, __v: 0 });
    return user;
  }

  async function deleteUserById(id: string) {
    const result = await model.findOneAndDelete({ id });
    return result;
  }

  return Object.freeze({
    create,
    findAll,
    findById,
    deleteUserById
  });
}
