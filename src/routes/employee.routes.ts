import express, { Router } from "express";
import {
  getEmployees,
  createEmployee,
  getEmployee,
  putEmployee,
  deleteEmployee,
} from "../controllers";
import { checkAuth } from "../middleware";

const router: Router = express.Router();

router.route("/").get(checkAuth, getEmployees).post(checkAuth, createEmployee);

router
  .route("/:id")
  .get(checkAuth, getEmployee)
  .put(checkAuth, putEmployee)
  .delete(checkAuth, deleteEmployee);

export default router;
