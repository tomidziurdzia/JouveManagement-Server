import { Request, Response } from "express";
import { Business, Employee } from "../models";
import { comparePassword, generateJWT } from "../utils";

const authEmployee = async (req: Request, res: Response) => {
  const { cuil, password, cuit } = req.body;

  // Comprobar si el usuario existe
  const employeeExist = await Employee.findOne({ where: { cuil } });
  const businessExist = await Business.findOne({ where: { cuit } });

  if (cuil === "") {
    const error = new Error("Cuil cannot be empty");
    return res.status(400).json({ msg: error.message });
  }
  if (password === "") {
    const error = new Error("Password cannot be empty");
    return res.status(400).json({ msg: error.message });
  }
  if (cuit === "") {
    const error = new Error("Cuit cannot be empty");
    return res.status(400).json({ msg: error.message });
  }

  if (!employeeExist) {
    const error = new Error("Employee doesn't exist");
    return res.status(400).json({ msg: error.message });
  }

  if (!businessExist) {
    const error = new Error("Business doesn't exist");
    return res.status(400).json({ msg: error.message });
  }

  // Comprobar password
  const isMatch = comparePassword(password, employeeExist.password!);
  if (isMatch) {
    res.json({
      id_employee: employeeExist?.id_employee,
      id_business: employeeExist?.id_business,
      name: employeeExist.name,
      lastname: employeeExist.lastname,
      cuil: employeeExist.cuil,
      type: employeeExist.type,
      token: generateJWT(employeeExist.id_employee!),
    });
  } else {
    const error = new Error("The password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};

const checkSessionEmployee = async (req: Request, res: Response) => {
  const { body } = req;
  body!.employee.token = generateJWT(body.employee!.id_employee);
  res.json(body.employee);
};

export { authEmployee, checkSessionEmployee };
