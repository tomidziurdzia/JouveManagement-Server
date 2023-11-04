import express, { Router } from "express";
import {
  getVehicles,
  createVehicle,
  getVehicle,
  putVehicles,
  deleteVehicle,
} from "../controllers";
import { checkAuth } from "../middleware";

const router: Router = express.Router();

router.route("/").get(checkAuth, getVehicles).post(checkAuth, createVehicle);

router
  .route("/:id")
  .get(checkAuth, getVehicle)
  .put(checkAuth, putVehicles)
  .delete(checkAuth, deleteVehicle);

export default router;
