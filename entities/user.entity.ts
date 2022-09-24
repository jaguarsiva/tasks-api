import { UserPayload } from '../utils/types/user.type';
import joi from 'joi';
import BadRequestException from '../utils/BadRequest';

const userSchema = joi
  .object({
    username: joi.string().required(),
    fullname: joi.string().required(),
    password: joi.string().required(),
    gender: joi.string().valid('MALE', 'FEMALE').required()
  })
  .options({ abortEarly: false });

export default function buildMakeUser(
  generateId: () => string,
  hashPassword: (pwd: string) => Promise<string>
) {
  return async function makeUser(data: UserPayload) {
    const validationResult = userSchema.validate(data);
    if (validationResult.error) {
      const error = validationResult.error.details.map(e => e.message);
      throw new BadRequestException(error);
    }

    const id = generateId();
    const username = data.username.trim();
    const fullname = data.fullname.trim();
    const password = data.password.trim();
    const gender = data.gender;
    const hashedPassword = await hashPassword(password);
    const createdOn = new Date();

    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getFullname: () => fullname,
      getGender: () => gender,
      getPassword: () => hashedPassword,
      getCreatedOn: () => createdOn
    });
  };
}
