// export type TaskStatus = 'ACTIVE' | 'COMPLETED' | 'PUSHED' | 'REMOVED';

import { makeTask } from '../../entities';

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PUSHED = 'PUSHED',
  REMOVED = 'REMOVED'
}

export interface TaskPayload {
  userId: string;
  title: string;
  description: string;
  date?: string;
}

export interface Task extends TaskPayload {
  id: string;
  status: TaskStatus;
  date: string;
}

export interface TaskDocument extends Task, Document {}

export type MakeTask = typeof makeTask;
