import { compareSync, genSaltSync, hashSync } from "bcrypt";

const hashPassword = (password: string) => {
  const salt = genSaltSync();
  return hashSync(password, salt);
};

const comparePassword = (password: string, hashedPassword: string) => {
  return compareSync(password, hashedPassword);
};

export { hashPassword, comparePassword };
