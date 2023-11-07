import { Router } from "express";
import {
  getBusinesses,
  postBusiness,
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
  .put(checkAuth, putBusiness)
  .delete(checkAuth, deleteBusiness);
router.post("/forget-password", forgetPasswordBusiness);
router.post("/forget-password/:token", newPasswordBusiness);

export default router;
