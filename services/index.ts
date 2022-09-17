import makeTaskService from './task';
import taskModel from './task/task.model';
import makeUserService from './user';
import userModel from './user/user.model';

export const user = makeUserService(userModel);
export const task = makeTaskService(taskModel);
const services = Object.freeze({
  user,
  task
});
export default services;
