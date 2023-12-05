import { Router } from "express";
import {
  authEmployee,
  checkSessionEmployee,
} from "../controllers/authEmployee.controller";
import { checkAuthEmployee } from "../middleware";

const router: Router = Router();

router.post("/login", authEmployee);
router.get("/", checkAuthEmployee, checkSessionEmployee);

export default router;
