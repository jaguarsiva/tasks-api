import { Request } from 'express';

export default function makeGetUsersController(
  findAllUsers: any,
  findUserById: any
) {
  async function getAllUsersController() {
    const users = await findAllUsers();
    return {
      status: 200,
      body: {
        users
      }
    };
  }

  async function getUserByIdController(req: Request) {
    const id = req.params.id;

    const user = await findUserById(id);
    if (!user) {
      return {
        status: 400,
        body: {
          message: `user with id ${id} doesn't exist.`
        }
      };
    } else {
      return {
        status: 200,
        body: {
          user
        }
      };
    }
  }

  return Object.freeze({
    getAllUsersController,
    getUserByIdController
  });
}
