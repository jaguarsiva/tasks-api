import { Request } from 'express';
import { Task } from '../../utils/types/task.type';

export default function makeGetTaskController(
  findByDate: any,
  findById: any,
  findAll: any
) {
  return async function getTaskController(req: Request) {
    const query = req.query;
    const userId = req.headers.user_id;
    if (!userId) {
      return {
        status: 400,
        body: {
          message: `user_id missing`
        }
      };
    }

    if (query.date) {
      const tasks = await findByDate(userId, query.date);
      return {
        body: {
          tasks
        }
      };
    } else if (query.id) {
      const task = await findById(query.id);
      if (task) return { status: 200, body: task };
      else {
        return {
          status: 400,
          body: {
            message: `Task not found for id ${query.id}`
          }
        };
      }
    } else {
      const tasks = await findAll(userId);
      return {
        body: {
          tasks
        }
      };
    }
  };
}
