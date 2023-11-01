import { Router } from "express";
import {
  getBusinesses,
  postBusiness,
  getBusiness,
  putBusiness,
  forgetPasswordBusiness,
  newPasswordBusiness,
  deleteBusiness,
} from "../controllers";

const router: Router = Router();

router.get("/", getBusinesses);
router.post("/", postBusiness);
router.get("/:id", /*checkAuth,*/ getBusiness);
router.put("/:id", putBusiness);
router.post("/forget-password", forgetPasswordBusiness);
router.post("/forget-password/:token", newPasswordBusiness);
router.delete("/:id", deleteBusiness);

export default router;
