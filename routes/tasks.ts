import express from 'express';
import controllers from '../controllers';

const router = express.Router();

// create task
router.post('/', controllers.postTaskCallback);

// get tasks
router.get('/', controllers.getTaskCallback);

// update task
router.patch('/:id', controllers.updateTaskCallback);

// push task to tomorrow
router.patch('/:id/push', controllers.pushTaskCallback);

export default router;
