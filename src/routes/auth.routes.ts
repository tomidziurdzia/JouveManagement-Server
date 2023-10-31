import { Router } from "express";
import {
  authBusiness,
  confirmToken,
  forgetPassword,
  checkToken,
  newPassword,
} from "../controllers";

const router: Router = Router();

router.get("/confirm/:token", confirmToken);
router.post("/login", authBusiness);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(checkToken).post(newPassword);

export default router;
