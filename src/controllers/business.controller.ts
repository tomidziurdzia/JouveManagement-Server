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
  const business = await Business.findByPk(id);

  if (business) {
    res.json(business);
  } else {
    res.status(404).json({
      msg: `Doesn't exist business with id ${id}`,
    });
  }
};
const putBusiness = (req: Request, res: Response) => {};
const deleteBusiness = (req: Request, res: Response) => {};

export {
  getBusinesses,
  postBusiness,
  getBusiness,
  putBusiness,
  deleteBusiness,
};
