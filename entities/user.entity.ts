import { UserPayload } from '../utils/types/user.type';

export default function buildMakeUser(
  generateId: () => string,
  hashPassword: (pwd: string) => Promise<string>
) {
  return async function makeUser(data: UserPayload) {
    // Add validations

    const id = generateId();
    const username = data.username.trim();
    const fullname = data.fullname.trim();
    const password = data.password.trim();
    const hashedPassword = await hashPassword(password);
    const createdOn = new Date();

    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getFullname: () => fullname,
      getPassword: () => hashedPassword,
      getCreatedOn: () => createdOn
    });
  };
}
