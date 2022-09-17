import bcrypt from 'bcrypt';
const saltRounds = 5;

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<Boolean> {
  const result = await bcrypt.compare(password, hash);
  return result;
}
