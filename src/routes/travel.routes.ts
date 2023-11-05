import express, { Router } from "express";
import {
  getTravels,
  createTravel,
  getTravel,
  putTravel,
  deleteTravel,
} from "../controllers";
import { checkAuth } from "../middleware";

const router: Router = express.Router();

router.route("/").get(checkAuth, getTravels).post(checkAuth, createTravel);

router
  .route("/:id")
  .get(checkAuth, getTravel)
  .put(checkAuth, putTravel)
  .delete(checkAuth, deleteTravel);

export default router;
