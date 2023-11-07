import { Request, Response } from "express";
import { Business } from "../models";
import { BusinessInterface } from "../interface/business.interface";
import {
  checkRegexPassword,
  comparePassword,
  generateJWT,
  generateToken,
  hashPassword,
  resetPasswordValidationBusiness,
} from "../utils";

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
      id_business: businessExist.id_business,
      businessName: businessExist.businessName,
      email: businessExist.email,
      token: generateJWT(businessExist.id_business!),
    });
  } else {
    const error = new Error("The password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmToken = async (req: Request, res: Response) => {
  const { token } = req.params;
  const businessExist = await Business.findOne({ where: { token } });

  if (!businessExist) {
    const error = new Error("Invalid token");
    return res.status(403).json({ msg: error.message });
  }

  try {
    businessExist.confirmed = true;
    businessExist.token = "";
    await businessExist.save();
    res.json({ msg: "Your business has been confirmed, you can sign in" });
  } catch (error) {
    console.log(error);
  }
};

const forgetPasswordBusiness = async (req: Request, res: Response) => {
  const { email } = req.body;
  const businessExist = await Business.findOne({ where: { email } });
  if (!businessExist) {
    const error = new Error("Business doesn't exist");
    return res.status(404).json({ msg: error.message });
  }

  try {
    businessExist.token = generateToken();

    await businessExist.save();

    // Send email to confirm account with token
    await resetPasswordValidationBusiness(
      email,
      businessExist.token,
      businessExist.businessName!
    );

    res.json({ msg: "We have sent an email with instructions" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    console.log(token);
    const businessExist = await Business.findOne({ where: { token } });
    if (!businessExist) {
      const error = new Error("Invalid token");
      return res.status(403).json({ msg: error.message });
    } else {
      res.json({ msg: "Token valid, business exists" });
    }
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};

const newPasswordBusiness = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const businessExist = await Business.findOne({ where: { token } });

  if (!businessExist) {
    const error = new Error("Invalid token");
    return res.status(403).json({ msg: error.message });
  }

  if (password === "") {
    const error = new Error("Password cannot be empty");
    return res.status(400).json({ msg: error.message });
  }

  if (businessExist) {
    try {
      checkRegexPassword(password);
      businessExist.password =
        hashPassword(password) || businessExist?.password;
      await businessExist.save();
      res.json({ msg: "Password successfully modified" });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ msg: error.message });
    }
  } else {
    const error = new Error("Invalid token");
    return res.status(403).json({ msg: error.message });
  }
};

const checkSession = async (req: Request, res: Response) => {
  const { body } = req;
  body!.business.token = generateJWT(body.business!.id_business);
  res.json(body.business);
};

export {
  authBusiness,
  confirmToken,
  forgetPasswordBusiness,
  checkToken,
  newPasswordBusiness,
  checkSession,
};
