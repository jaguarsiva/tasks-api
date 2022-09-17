import { Model } from 'mongoose';
import { Task, TaskDocument } from '../../utils/types/task.type';

export default function makeTaskService(model: Model<TaskDocument, {}, {}>) {
  async function create(task: Task) {
    const insertedTask = await model.create(task);
    return insertedTask;
  }

  async function findAll() {
    const tasks = await model.find({}, { _id: 0, __v: 0 });
    return tasks;
  }

  async function findById(id: string) {
    const task = await model.findOne({ id }, { _id: 0, __v: 0 });
    return task;
  }

  async function findByDate(date: string) {
    const task = await model.find({ date }, { _id: 0, __v: 0 });
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
