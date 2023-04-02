import bcrypt from "bcrypt";

export async function generateSalt(): Promise<string> {
  return await bcrypt.genSalt();
}

export async function hashPassword(
  password: string,
  salt: string
): Promise<string> {
  const saltedpassword = password + salt;
  return await bcrypt.hash(saltedpassword, 10);
}

export async function verifyPassword(
  saltedpassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(saltedpassword, hashedPassword);
}
