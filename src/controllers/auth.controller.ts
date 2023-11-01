import { Request, Response } from "express";
import Business from "../models/business.model";
import { BusinessInterface } from "../interface/business.interface";
import { comparePassword, generateJWT } from "../utils";

const authBusiness = async (req: Request, res: Response) => {
  const { email, password }: BusinessInterface = req.body;

  // Comprobar si el usuario existe
  const businessExist = await Business.findOne({ where: { email } });

  if (email === "") {
    const error = new Error("Email cannot be empty");
    return res.status(400).json({ msg: error.message });
  }

  if (password === "") {
    const error = new Error("Password cannot be empty");
    return res.status(400).json({ msg: error.message });
  }

  if (!businessExist) {
    const error = new Error("Business doesn't exist");
    return res.status(400).json({ msg: error.message });
  }
  // Comprobar si el usuario esta confirmado
  if (!businessExist.confirmed) {
    const error = new Error("Your business has not been confirmed");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar password
  const isMatch = comparePassword(password, businessExist.password!);
  if (isMatch) {
    res.json({
      id: businessExist.id,
      businessName: businessExist.businessName,
      email: businessExist.email,
      token: generateJWT(businessExist.id!),
    });
  } else {
    const error = new Error("The password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};
const confirmToken = (req: Request, res: Response) => {};
const forgetPassword = (req: Request, res: Response) => {};
const checkToken = (req: Request, res: Response) => {};
const newPassword = (req: Request, res: Response) => {};

export { authBusiness, confirmToken, forgetPassword, checkToken, newPassword };
