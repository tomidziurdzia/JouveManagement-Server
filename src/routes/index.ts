import { Router } from "express";
import businessRoutes from "./business.routes";
import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import vehicleRoutes from "./vehicle.routes";
import travelRoutes from "./travel.routes";
import shipmentRoutes from "./shipment.routes";
import authEmployeeRoutes from "./authEmployee.routes";

const router: Router = Router();

router.use("/business", businessRoutes);
router.use("/auth", authRoutes);
router.use("/employee", employeeRoutes);
router.use("/vehicle", vehicleRoutes);
router.use("/travel", travelRoutes);
router.use("/shipment", shipmentRoutes);
router.use("/auth-employee", authEmployeeRoutes);

export default router;
