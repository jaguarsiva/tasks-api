import express from 'express';
import controllers from '../controllers';

const router = express.Router();

// add user
router.post('/', controllers.postUserCallback);

// get all users
router.get('/', controllers.getAllUsersCallback);

// get user by id
router.get('/:id', controllers.getUserByIdCallback);

// delete user by id
router.delete('/:id', controllers.deleteUserByIdCallback);

export default router;
