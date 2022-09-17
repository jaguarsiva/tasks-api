import buildMakeUser from './user.entity';
import buildMakeTask from './task.entity';
import generateId from '../utils/idGenerator';
import { hashPassword } from '../utils/hashPassword';

export const makeUser = buildMakeUser(generateId, hashPassword);
export const makeTask = buildMakeTask(generateId);

const entities = Object.freeze({
  makeUser,
  makeTask
});
export default entities;
