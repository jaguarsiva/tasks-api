import makeExpressCallback from '../utils/express';
import entities from '../entities';
import services from '../services';
import makePostUserController from './users/post.controller';
import makeGetUsersController from './users/get.controller';
import makeDeleteUserController from './users/delete.controller';
import makePostTaskController from './tasks/post.controller';
import makeGetTaskController from './tasks/get.controller';
import makePatchTaskController from './tasks/patch.controller';

const postUserController = makePostUserController(
  entities.makeUser,
  services.user.create
);

const { getAllUsersController, getUserByIdController } = makeGetUsersController(
  services.user.findAll,
  services.user.findById
);

const deleteUserByIdController = makeDeleteUserController(
  services.user.deleteUserById
);

const postTaskController = makePostTaskController(
  entities.makeTask,
  services.task.create
);

const getTaskController = makeGetTaskController(
  services.task.findByDate,
  services.task.findById,
  services.task.findAll
);

const { updateTaskController, pushTaskController } = makePatchTaskController(
  services.task.create,
  services.task.update,
  services.task.findById,
  entities.makeTask
);

// Callbacks

const postUserCallback = makeExpressCallback(postUserController);
const getAllUsersCallback = makeExpressCallback(getAllUsersController);
const getUserByIdCallback = makeExpressCallback(getUserByIdController);
const deleteUserByIdCallback = makeExpressCallback(deleteUserByIdController);

const postTaskCallback = makeExpressCallback(postTaskController);
const getTaskCallback = makeExpressCallback(getTaskController);
const updateTaskCallback = makeExpressCallback(updateTaskController);
const pushTaskCallback = makeExpressCallback(pushTaskController);

const controllers = Object.freeze({
  postUserCallback,
  getAllUsersCallback,
  getUserByIdCallback,
  deleteUserByIdCallback,

  postTaskCallback,
  getTaskCallback,
  updateTaskCallback,
  pushTaskCallback
});

export default controllers;
