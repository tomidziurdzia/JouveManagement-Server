import express, { Router } from "express";
import { checkAuthEmployee } from "../middleware";
import {
  getAppTravels,
  geAppTravel,
  getAppShipments,
  getAppShipment,
} from "../controllers/app.controller";

const router: Router = express.Router();

router.get("/travel", checkAuthEmployee, getAppTravels);
router.get("/travel/:id", checkAuthEmployee, geAppTravel);
router.get("/shipment", checkAuthEmployee, getAppShipments);
router.get("/shipment/:id", checkAuthEmployee, getAppShipment);

export default router;
