import { Request } from 'express';
import { Task } from '../../utils/types/task.type';

export default function makeGetTaskController(
  findByDate: any,
  findById: any,
  findAll: any
) {
  return async function getTaskController(req: Request) {
    const query = req.query;

    if (query.date) {
      const tasks = await findByDate(query.date);
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
      const tasks = await findAll();
      return {
        body: {
          tasks
        }
      };
    }
  };
}
