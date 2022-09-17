import { Request } from 'express';

export default function makeDeleteUserController(deleteUserById: any) {
  return async function deleteUserByIdController(req: Request) {
    const id = req.params.id;
    const result = await deleteUserById(id);

    return {
      status: 200,
      body: {
        message: 'user deleted',
        result
      }
    };
  };
}
