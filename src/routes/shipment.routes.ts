import express, { Router } from "express";
import {
  createShipment,
  deleteShipment,
  getShipment,
  getShipments,
  putShipment,
} from "../controllers";
import { checkAuth } from "../middleware";

const router: Router = express.Router();

router.route("/").get(checkAuth, getShipments).post(checkAuth, createShipment);

router
  .route("/:id")
  .get(checkAuth, getShipment)
  .put(checkAuth, putShipment)
  .delete(checkAuth, deleteShipment);

export default router;
