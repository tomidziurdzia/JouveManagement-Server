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
import { checkAuth } from "../middleware";

const router: Router = Router();

router.route("/").get(getBusinesses).post(postBusiness);
router
  .route("/:id")
  .get(checkAuth, getBusiness)
  .put(putBusiness)
  .delete(deleteBusiness);
router.post("/forget-password", forgetPasswordBusiness);
router.post("/forget-password/:token", newPasswordBusiness);

export default router;
