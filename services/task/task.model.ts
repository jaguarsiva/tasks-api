import { Schema, model } from 'mongoose';
import { TaskDocument } from '../../utils/types/task.type';

const taskSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    unique: false
  },
  status: {
    type: String,
    required: true,
    unique: false
  },
  title: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  date: {
    type: String,
    required: true,
    unique: false
  }
});

const taskModel = model<TaskDocument>('task', taskSchema);
export default taskModel;
