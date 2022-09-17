import makePushActiveTasksJob from './push.job';
import services from '../services';

export const pushActiveTasksJob = makePushActiveTasksJob(
  services.task.findAllActiveTasks,
  services.task.updateAllActiveTasks,
  services.task.insertPushedTasks
);

const jobs = Object.freeze({
  pushActiveTasksJob
});

export default jobs;
