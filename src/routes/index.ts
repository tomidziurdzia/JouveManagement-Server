import { Router } from "express";
import businessRoutes from "./business.routes";
import authRoutes from "./auth.routes";
import authEmployees from "./employee.routes";

const router: Router = Router();

router.use("/business", businessRoutes);
router.use("/auth", authRoutes);
router.use("/employee", authEmployees);

export default router;
