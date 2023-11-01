import jwt from "jsonwebtoken";

const generateJWT = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "2h",
  });
};

export { generateJWT };
