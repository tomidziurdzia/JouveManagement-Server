import { Router } from "express";
import businessRoutes from "./business.routes";
import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import vehicleRoutes from "./vehicle.routes";

const router: Router = Router();

router.use("/business", businessRoutes);
router.use("/auth", authRoutes);
router.use("/employee", employeeRoutes);
router.use("/vehicle", vehicleRoutes);

export default router;
