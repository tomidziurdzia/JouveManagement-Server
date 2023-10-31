import { Router } from "express";
import businessRoutes from "./business.routes";
import authRoutes from "./auth.routes";

const router: Router = Router();

router.use("/business", businessRoutes);
router.use("/auth", authRoutes);

export default router;
