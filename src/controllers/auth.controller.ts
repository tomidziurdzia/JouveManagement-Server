import { Request, Response } from "express";

const authUser = (req: Request, res: Response) => {};
const confirmToken = (req: Request, res: Response) => {};
const forgetPassword = (req: Request, res: Response) => {};
const checkToken = (req: Request, res: Response) => {};
const newPassword = (req: Request, res: Response) => {};

export { authUser, confirmToken, forgetPassword, checkToken, newPassword };
