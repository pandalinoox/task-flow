import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const checkPasswordIsValid = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};
