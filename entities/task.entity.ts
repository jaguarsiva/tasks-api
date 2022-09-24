import { TaskPayload, TaskStatus } from '../utils/types/task.type';
import BadRequestException from '../utils/BadRequest';
import moment from 'moment-timezone';
import joi from 'joi';

const taskSchema = joi
  .object()
  .keys({
    title: joi.string().min(3).required(),
    description: joi.string().min(0).required(),
    userId: joi.string().required(),
    date: joi.string()
  })
  .options({ abortEarly: false });

export default function buildMakeTask(generateId: () => string) {
  return function makeTask(data: TaskPayload) {
    const validationResult = taskSchema.validate(data);
    if (validationResult.error) {
      const error = validationResult.error.details.map(e => e.message);
      throw new BadRequestException(error);
    }

    const id = generateId();
    const title = data.title.trim();
    const userId = data.userId;
    const description = data.description.trim();
    const status = TaskStatus.ACTIVE;
    const date = data.date || moment().tz('Asia/Kolkata').format('DD/MM/YYYY');

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
