import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
  res.json({ msg: "Hola" });
};
const postUser = (req: Request, res: Response) => {};
const getUser = (req: Request, res: Response) => {
  res.json({ msg: "Hola" });
};
const putUser = (req: Request, res: Response) => {};
const deleteUser = (req: Request, res: Response) => {};

export { getUsers, postUser, getUser, putUser, deleteUser };
