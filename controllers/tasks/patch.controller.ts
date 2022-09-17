import { Request } from 'express';
import generateId from '../../utils/idGenerator';
import { Task, TaskStatus } from '../../utils/types/task.type';

export default function makePatchTaskController(
  create: any,
  update: any,
  findById: any
) {
  async function updateTaskController(req: Request) {
    const id = req.params.id;
    const fieldsToUpdate = req.body;

    const updatedTask = await update(id, fieldsToUpdate);
    return {
      status: 200,
      body: updatedTask
    };
  }

  async function pushTaskController(req: Request) {
    const id = req.params.id;
    const fieldsToUpdate = {
      status: TaskStatus.PUSHED
    };

    const updatedTask = await update(id, fieldsToUpdate);

    const foundTask = await findById(id, fieldsToUpdate);

    const task: Task = {
      id: generateId(),
      title: foundTask.title,
      description: foundTask.description,
      status: TaskStatus.ACTIVE,
      date: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toLocaleDateString()
    };
    const createdTask = await create(task);

    return {
      status: 200,
      body: createdTask
    };
  }

  return Object.freeze({
    updateTaskController,
    pushTaskController
  });
}
