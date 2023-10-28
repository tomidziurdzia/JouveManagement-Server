import { Router } from "express";
import {
  getUsers,
  postUser,
  getUser,
  putUser,
  deleteUser,
} from "../controllers";

const router: Router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.get("/:id", /*checkAuth,*/ getUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
