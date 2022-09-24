import makePushActiveTasksJob from './push.job';
import services from '../services';
import entities from '../entities';

export const pushActiveTasksJob = makePushActiveTasksJob(
  services.task.findAllActiveTasks,
  services.task.pushAllActiveTasks,
  services.task.insertPushedTasks,
  entities.makeTask
);

const jobs = Object.freeze({
  pushActiveTasksJob
});

export default jobs;
