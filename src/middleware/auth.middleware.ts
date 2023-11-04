import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Business from "../models/business.model";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header("Authorization");

  if (!authorization)
    return res.status(401).json({ error: "Not token provided" });

  if (!authorization.startsWith("Bearer "))
    return res.status(401).json({ error: "Invalid Bearer token" });

  const token = authorization.split(" ")[1] || "";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const decodedId = await Object.values(decoded)[0];

    const checkBusiness = await Business.findByPk(decodedId);
    if (!checkBusiness) {
      return res.status(401).json({ error: "Invalid token - user" });
    }

    req.body.business = {
      businessName: checkBusiness.businessName,
      cuit: checkBusiness.cuit,
      email: checkBusiness.email,
      picture: checkBusiness.picture,
      role: checkBusiness.role,
    };

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { checkAuth };
