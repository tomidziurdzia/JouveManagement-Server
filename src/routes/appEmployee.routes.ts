import express, { Router } from "express";
import { checkAuthEmployee } from "../middleware";
import { getAppTravels, geAppTravel } from "../controllers/app.controller";

const router: Router = express.Router();

router.get("/", checkAuthEmployee, getAppTravels);
router.get("/:id", checkAuthEmployee, geAppTravel);

export default router;
