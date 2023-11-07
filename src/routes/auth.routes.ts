import { Router } from "express";
import {
  authBusiness,
  confirmToken,
  forgetPasswordBusiness,
  checkToken,
  newPasswordBusiness,
  checkSession,
} from "../controllers";
import { checkAuth } from "../middleware";

const router: Router = Router();

router.get("/confirm/:token", confirmToken);
router.post("/login", authBusiness);
router.post("/forget-password", forgetPasswordBusiness);
router.route("/forget-password/:token").get(checkToken);
router.get("/", checkAuth, checkSession);
router.post("/new-password/:token", newPasswordBusiness);

export default router;
