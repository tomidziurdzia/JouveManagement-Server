import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Employee } from "../models";

export const checkAuthEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Not token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const decodedId = await Object.values(decoded)[0];

    const checkEmployee = await Employee.findByPk(decodedId);

    if (!checkEmployee) {
      return res.status(401).json({ error: "Invalid token - user" });
    }

    req.body.employee = {
      id_employee: checkEmployee.id_employee,
      name: checkEmployee.name,
      lastname: checkEmployee.lastname,
      cuil: checkEmployee.cuil,
      type: checkEmployee.type,
      id_business: checkEmployee.id_business,
    };

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
