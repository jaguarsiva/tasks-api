import { Request } from 'express';
import { MakeTask, Task, TaskPayload } from '../../utils/types/task.type';

export default function makePostTaskController(
  makeTask: MakeTask,
  createTask: (task: Task) => any
) {
  return async function postTaskController(req: Request) {
    const userId = req.headers.user_id;
    if (!userId) {
      return {
        status: 400,
        body: {
          message: `user_id missing`
        }
      };
    }

    const payload: TaskPayload = {
      ...req.body,
      userId
    };
    const result = makeTask(payload);
    const task: Task = {
      id: result.getId(),
      title: result.getTitle(),
      userId: result.getUserId(),
      description: result.getDescription(),
      status: result.getStatus(),
      date: result.getDate()
    };

    const createdTask = await createTask(task);
    const { _id, __v, ...body } = createdTask;

    return {
      status: 200,
      body
    };
  };
}
