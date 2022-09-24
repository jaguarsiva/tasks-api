import { Model } from 'mongoose';
import { Task, TaskDocument, TaskStatus } from '../../utils/types/task.type';
import moment from 'moment-timezone';

export default function makeTaskService(model: Model<TaskDocument, {}, {}>) {
  async function create(task: Task) {
    const insertedTask = await model.create(task);
    return insertedTask;
  }

  async function findAll(userId: string) {
    const tasks = await model.find({ userId }, { _id: 0, __v: 0, userId: 0 });
    return tasks;
  }

  async function findByDate(userId: string, date: string) {
    const tasks = await model.find(
      { userId, date },
      { _id: 0, __v: 0, userId: 0 }
    );
    return tasks;
  }

  async function findById(id: string) {
    const task = await model.findOne({ id }, { _id: 0, __v: 0, userId: 0 });
    return task;
  }

  async function update(id: string, fieldsToUpdate: any) {
    const result = await model.updateOne({ id }, fieldsToUpdate, {
      _id: 0,
      __v: 0
    });
    return result;
  }

  async function findAllActiveTasks() {
    const filterExp = {
      status: TaskStatus.ACTIVE,
      date: moment().tz('Asia/Kolkata').format('DD/MM/YYYY')
    };
    const projectionExp = { _id: 0, __v: 0 };
    const tasks = await model.find(filterExp, projectionExp);
    return tasks;
  }

  async function pushAllActiveTasks() {
    const filterExp = {
      status: TaskStatus.ACTIVE,
      date: moment().tz('Asia/Kolkata').format('DD/MM/YYYY')
    };
    const fieldsToUpdate = {
      status: TaskStatus.PUSHED
    };
    const result = await model.updateMany(filterExp, fieldsToUpdate);
    return result;
  }

  async function insertPushedTasks(tasks: Task[]) {
    const results = await model.insertMany(tasks);
    return results;
  }

  return Object.freeze({
    create,
    findAll,
    findById,
    findByDate,
    update,
    findAllActiveTasks,
    pushAllActiveTasks,
    insertPushedTasks
  });
}
