import { Request } from 'express';
import { MakeUser, UserPayload } from '../../utils/types/user.type';

export default function makePostUserController(
  makeUser: MakeUser,
  createUser: any
) {
  return async function postUserController(req: Request) {
    const payload: UserPayload = req.body;
    const result = await makeUser(payload);
    const userDocument = {
      id: result.getId(),
      username: result.getUsername(),
      fullname: result.getFullname(),
      gender: result.getGender(),
      password: result.getPassword(),
      createdOn: result.getCreatedOn()
    };

    const insertedUser = await createUser(userDocument);
    const { _id, __v, password, ...body } = insertedUser;

    return {
      status: 200,
      body
    };
  };
}
