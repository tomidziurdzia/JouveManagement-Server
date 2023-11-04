import { Router } from "express";
import {
  authBusiness,
  confirmToken,
  forgetPasswordBusiness,
  checkToken,
  newPasswordBusiness,
} from "../controllers";

const router: Router = Router();

router.get("/confirm/:token", confirmToken);
router.post("/login", authBusiness);
router.post("/forget-password", forgetPasswordBusiness);
router
  .route("/forget-password/:token")
  .get(checkToken)
  .post(newPasswordBusiness);

export default router;
