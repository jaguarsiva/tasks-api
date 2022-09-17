import { Request } from 'express';
import { MakeTask, Task, TaskPayload } from '../../utils/types/task.type';

export default function makePostTaskController(
  makeTask: MakeTask,
  createTask: (task: Task) => any
) {
  return async function postTaskController(req: Request) {
    const payload: TaskPayload = req.body;
    const result = makeTask(payload);
    const task: Task = {
      id: result.getId(),
      title: result.getTitle(),
      description: result.getDescription(),
      status: result.getStatus(),
      date: result.getDate()
    };
    const createdTask = await createTask(task);

    return {
      status: 200,
      body: createdTask
    };
  };
}
