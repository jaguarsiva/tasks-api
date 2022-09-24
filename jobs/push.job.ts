import db from '../services/db';
import { MakeTask, Task } from '../utils/types/task.type';
import moment from 'moment-timezone';
import logger from '../utils/logger';

export default function makePushActiveTasksJob(
  findAllActiveTasks: any,
  pushAllActiveTasks: any,
  insertPushedTasks: any,
  makeTask: MakeTask
) {
  return async function pushActiveTasksJob() {
    try {
      logger.info('pushActiveTasksJob called');

      await db.connect();
      const activeTasks = await findAllActiveTasks();
      logger.info(`Active tasks Count - ${activeTasks.length}`);
      logger.info('activeTasks', activeTasks);

      if (!activeTasks.length) {
        logger.info('No active tasks leftover for the day');
        return;
      }

      const result = await pushAllActiveTasks();
      logger.info('pushed all active tasks', result);
      logger.info(`Matched count ${result.matchedCount}`);
      logger.info(`Modified count ${result.modifiedCount}`);

      const date = moment().tz('Asia/Kolkata').add(1, 'd').format('DD/MM/YYYY');

      const tasksToInsert = activeTasks.map((task: Task) => {
        const { title, description, userId } = task;
        const result = makeTask({ title, description, userId, date });
        return {
          id: result.getId(),
          title: result.getTitle(),
          userId: result.getUserId(),
          description: result.getDescription(),
          status: result.getStatus(),
          date: result.getDate()
        };
      });

      const insertedResults = await insertPushedTasks(tasksToInsert);
      logger.info('inserted pushed tasks', insertedResults);

      await db.disconnect();
    } catch (error) {
      logger.error('error', error);
      await db.disconnect();
    } finally {
      logger.info('End of Job');
      logger.info('');
    }
  };
}
