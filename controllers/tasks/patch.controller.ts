import { Request } from 'express';
import { MakeTask, Task, TaskStatus } from '../../utils/types/task.type';
import moment from 'moment-timezone';

export default function makePatchTaskController(
  create: any,
  update: any,
  findById: any,
  makeTask: MakeTask
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

    const updateResult = await update(id, fieldsToUpdate);
    if (updateResult.matchedCount === 0) {
      return {
        status: 400,
        body: {
          message: 'No tasks matched for the id ' + id
        }
      };
    }

    if (updateResult.modifiedCount < 1) {
      return {
        status: 400,
        body: {
          message: 'Task is in pushed status already'
        }
      };
    }

    const { title, description } = foundTask;
    const date = moment().tz('Asia/Kolkata').add(1, 'd').format('DD/MM/YYYY');
    const result = makeTask({ title, description, userId, date });
    const task: Task = {
      id: result.getId(),
      title: result.getTitle(),
      userId: result.getUserId(),
      description: result.getDescription(),
      status: result.getStatus(),
      date: result.getDate()
    };

    const createdTask = await create(task);

    return {
      status: 200,
      body: {
        message: 'Task pushed successfully',
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
