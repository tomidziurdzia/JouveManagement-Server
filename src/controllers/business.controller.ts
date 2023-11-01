import { Request, Response } from "express";
import Business from "../models/business.model";
import { BusinessInterface } from "../interface/business.interface";
import { generateToken, hashPassword } from "../utils";

const getBusinesses = async (req: Request, res: Response) => {
  const business = await Business.findAll();

  res.json(business);
};

const postBusiness = async (req: Request, res: Response) => {
  await Business.sync();
  // Prevenir Business duplicados
  const { businessName, cuit, email, password }: BusinessInterface = req.body;
  const businessExist = await Business.findOne({ where: { email } });

  if (businessExist) {
    const error = new Error("Business already registered");
    return res.status(400).json({ msg: error.message });
  }
  if (businessName === "") {
    const error = new Error("Business name cannot be empty");
    return res.status(400).json({ msg: error.message });
  }

  if (cuit?.toString() === "") {
    const error = new Error("Business name cannot be empty");
    return res.status(400).json({ msg: error.message });
  }

  if (email === "") {
    const error = new Error("Email cannot be empty");
    return res.status(400).json({ msg: error.message });
  }

  if (password === "") {
    const error = new Error("Password cannot be empty");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const newBusiness = new Business(req.body);

    // Generar token de autenticacion de email
    newBusiness.token = generateToken();

    // Hashear password
    newBusiness.password = hashPassword(password);

    //TODO: Enviar email de confirmacion

    await newBusiness.save();
    res.json({ newBusiness });
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({ msg: error.message });
  }
};

const getBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessExist = await Business.findByPk(id);

  if (businessExist) {
    res.json(businessExist);
  } else {
    res.status(404).json({
      msg: `Doesn't exist business with that id`,
    });
  }
};

const putBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessExist = await Business.findByPk(id);
  if (!businessExist) {
    const error = new Error("Business doesn't exist");
    return res.status(404).json({ msg: error.message });
  }
  //Este es un formulario una vez que se esta logueado para cambiar datos
  try {
    businessExist!.businessName =
      req.body.businessName || businessExist?.businessName;
    businessExist!.email = req.body.email || businessExist?.email;
    businessExist!.picture = businessExist!.picture =
      req.body.picture || businessExist?.picture;
    hashPassword(req.body.password) || businessExist?.password;

    await businessExist.save();

    res.json({ msg: "We have saved your details" });
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

    res.json({ msg: "We have sent an email with instructions" });
  } catch (error) {
    console.log(error);
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
    businessExist.password = hashPassword(password);
    businessExist.token = "";

    try {
      await businessExist.save();
      res.json({ msg: "Password successfully modified" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Invalid token");
    return res.status(403).json({ msg: error.message });
  }
};

const deleteBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessExist = await Business.findByPk(id);

  //TODO: Verificar luego que no tenga nada creado antes de borrar
  try {
    await businessExist?.destroy();

    res.json({ msg: "Business successfully eliminated" });
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};

export {
  getBusinesses,
  postBusiness,
  getBusiness,
  putBusiness,
  forgetPasswordBusiness,
  newPasswordBusiness,
  deleteBusiness,
};
