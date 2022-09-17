import { Request } from 'express';
import generateId from '../../utils/idGenerator';
import { Task, TaskStatus } from '../../utils/types/task.type';

export default function makePatchTaskController(
  create: any,
  update: any,
  findById: any
) {
  async function updateTaskController(req: Request) {
    const userId = req.headers.user_id;
    if (!userId) {
      return {
        status: 400,
        body: {
          message: `user_id missing`
        }
      };
    }

    const id = req.params.id;
    const fieldsToUpdate = req.body;
    const result = await update(id, fieldsToUpdate);

    if (result.matchedCount === 0) {
      return {
        status: 400,
        body: {
          message: 'No tasks matched for the id ' + id
        }
      };
    }

    if (result.modifiedCount < 1) {
      return {
        status: 400,
        body: {
          message: 'Already updated.'
        }
      };
    } else {
      const task = await findById(id);
      return {
        status: 200,
        body: {
          message: 'Task updated successfully!',
          task: task
        }
      };
    }
  }

  async function pushTaskController(req: Request) {
    const userId = req.headers.user_id! as string;
    if (!userId) {
      return {
        status: 400,
        body: {
          message: `user_id missing`
        }
      };
    }
    const id = req.params.id;
    const foundTask = await findById(id);

    if (foundTask.status !== TaskStatus.ACTIVE) {
      return {
        status: 400,
        body: {
          message: 'Can push only active tasks!'
        }
      };
    }

    const fieldsToUpdate = {
      status: TaskStatus.PUSHED
    };

    const result = await update(id, fieldsToUpdate);
    if (result.matchedCount === 0) {
      return {
        status: 400,
        body: {
          message: 'No tasks matched for the id ' + id
        }
      };
    }

    if (result.modifiedCount < 1) {
      return {
        status: 400,
        body: {
          message: 'Task is in pushed status already'
        }
      };
    }

    const task: Task = {
      id: generateId(),
      title: foundTask.title,
      description: foundTask.description,
      userId: userId,
      status: TaskStatus.ACTIVE,
      date: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toLocaleDateString()
    };
    const createdTask = await create(task);

    return {
      status: 200,
      body: {
        message: 'Task pushed to tomorrow',
        oldTask: foundTask,
        newTask: createdTask
      }
    };
  }

  return Object.freeze({
    updateTaskController,
    pushTaskController
  });
}
