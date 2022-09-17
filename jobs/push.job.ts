import db from '../services/db';
import { TaskStatus } from '../utils/types/task.type';
import generateId from '../utils/idGenerator';

export default function makePushActiveTasksJob(
  findAllActiveTasks: any,
  updateAllActiveTasks: any,
  insertPushedTasks: any
) {
  return async function pushActiveTasksJob() {
    try {
      console.log('pushActiveTasksJob called');

      await db.connect();
      const activeTasks = await findAllActiveTasks();
      console.log({ activeTasks });

      if (!activeTasks.length) {
        console.log('No active tasks leftover for the day');
        return;
      }

      const result = await updateAllActiveTasks();
      console.log('update result');
      console.log({ result });

      const status = TaskStatus.ACTIVE;
      const date = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toLocaleDateString();
      const tasksToInsert = activeTasks.map((task) => {
        return {
          id: generateId(),
          title: task.title,
          description: task.description,
          userId: task.userId,
          status,
          date
        };
      });

      const results = await insertPushedTasks(tasksToInsert);
      console.log('inserted pushed tasks');
      console.log(results);

      await db.disconnect();
    } catch (error) {
      console.log(error);
      await db.disconnect();
    }
  };
}