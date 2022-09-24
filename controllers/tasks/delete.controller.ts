import { Request } from 'express';
import { TaskStatus } from '../../utils/types/task.type';
import moment from 'moment-timezone';

export default function makeBringBackTaskController(
  findById: any,
  update: any,
  deleteTomoTask: any
) {
  return async function bringBackTaskController(req: Request) {
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
    const today = moment().tz('Asia/Kolkata').format('DD/MM/YYYY');

    const foundTask = await findById(id);
    if (foundTask.status !== TaskStatus.PUSHED) {
      return {
        status: 400,
        body: {
          message: 'Can bring back only PUSHED tasks!'
        }
      };
    }

    if (foundTask.date !== today) {
      return {
        status: 400,
        body: {
          message: 'Can bring back only today pushed tasks!'
        }
      };
    }

    const fieldsToUpdate = {
      status: TaskStatus.ACTIVE
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

    const { title, description } = foundTask;
    const date = moment().tz('Asia/Kolkata').add(1, 'd').format('DD/MM/YYYY');
    const filterExp = {
      userId,
      title,
      description,
      status: TaskStatus.ACTIVE,
      date
    };

    await deleteTomoTask(filterExp);
    const task = await findById(id);

    return {
      status: 200,
      body: {
        message: 'Successfully brought back',
        task
      }
    };
  };
}
