import { Request, Response } from "express";
import { Op } from "sequelize";
import { Business, Employee } from "../models";
import { BusinessInterface } from "../interface/business.interface";
import {
  generateToken,
  hashPassword,
  sendEmailValidationBusiness,
  checkRegexPassword,
  checkEmployeeExistence,
} from "../utils";

const getBusinesses = async (req: Request, res: Response) => {
  try {
    const business = await Business.findAll();
    res.json(business);
  } catch (error) {
    console.log(error);
  }
};

const postBusiness = async (req: Request, res: Response) => {
  try {
    await Business.sync();
    // Prevenir Business duplicados
    const { businessName, cuit, email, password }: BusinessInterface = req.body;
    const businessExist = await Business.findOne({
      where: {
        [Op.or]: [
          { email }, // Verificar si el correo electrónico ya existe
          { cuit }, // Verificar si el nombre de la empresa ya existe
        ],
      },
    });
    if (businessExist) {
      const error = new Error("Business already registered");
      return res.status(400).json({ msg: error.message });
    }
    if (businessName === "") {
      const error = new Error("Business name cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (cuit === "") {
      const error = new Error("Cuit cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (!/^\d{11}$/.test(cuit)) {
      const error = new Error("Cuit must have 11 numbers");
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

    checkRegexPassword(password);
    const newBusiness = new Business(req.body);

    // Generar token de autenticacion de email
    newBusiness.token = generateToken();

    // Hashear password
    newBusiness.password = hashPassword(password);

    // Send email to confirm account with token
    await sendEmailValidationBusiness(email, newBusiness.token, businessName);

    await newBusiness.save();
    res.json(newBusiness);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

const getBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const businessExist = await Business.findByPk(id);

    if (businessExist) {
      res.json(businessExist);
    } else {
      res.status(404).json({
        msg: `Doesn't exist business with that id`,
      });
    }
  } catch (error: any) {
    console.log(error);
  }
};

const putBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { businessName, picture, email, password } = req.body;

  //Este es un formulario una vez que se esta logueado para cambiar datos
  try {
    const businessExist = await Business.findByPk(id);
    if (!businessExist) {
      const error = new Error("Business doesn't exist");
      return res.status(404).json({ msg: error.message });
    }
    businessExist!.businessName = businessName || businessExist?.businessName;
    businessExist!.picture = picture || businessExist?.picture;
    businessExist!.email = email || businessExist?.email;

    checkRegexPassword(password);
    businessExist.password = hashPassword(password) || businessExist?.password;

    await businessExist.save();

    res.json(businessExist);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

const deleteBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const businessExist = await Business.findByPk(id);
    const employeesExist = await checkEmployeeExistence(id);

    // Verify if the business have employees
    if (employeesExist === 0) {
      await businessExist?.destroy();
      return res.json({ msg: "Business successfully eliminated" });
    } else {
      return res
        .status(404)
        .json({ msg: "You cannot delete the business if you have employees" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export {
  getBusinesses,
  postBusiness,
  getBusiness,
  putBusiness,
  deleteBusiness,
};
