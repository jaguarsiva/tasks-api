import { Model } from 'mongoose';
import { Task, TaskDocument } from '../../utils/types/task.type';

export default function makeTaskService(model: Model<TaskDocument, {}, {}>) {
  async function create(task: Task) {
    const insertedTask = await model.create(task);
    return insertedTask;
  }

  async function findAll(userId: string) {
    const tasks = await model.find({ userId }, { _id: 0, __v: 0 });
    return tasks;
  }

  async function findById(userId: string, id: string) {
    const task = await model.findOne({ userId, id }, { _id: 0, __v: 0 });
    return task;
  }

  async function findByDate(userId: string, date: string) {
    const task = await model.find({ userId, date }, { _id: 0, __v: 0 });
    return task;
  }

  async function update(id: string, fieldsToUpdate: any) {
    const task = await model.updateOne({ id }, fieldsToUpdate, {
      _id: 0,
      __v: 0
    });
    return task;
  }

  return Object.freeze({
    create,
    findAll,
    findById,
    findByDate,
    update
  });
}
