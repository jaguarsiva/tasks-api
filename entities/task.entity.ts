import { TaskPayload, TaskStatus } from '../utils/types/task.type';
import moment from 'moment';

export default function buildMakeTask(generateId: () => string) {
  return function makeTask(data: TaskPayload) {
    // Add validations

    const id = generateId();
    const title = data.title.trim();
    const userId = data.userId;
    const description = data.description.trim();
    const status = TaskStatus.ACTIVE;
    const date = moment().format('DD/MM/YYYY');

    return Object.freeze({
      getId: () => id,
      getUserId: () => userId,
      getTitle: () => title,
      getDescription: () => description,
      getStatus: () => status,
      getDate: () => date
    });
  };
}
