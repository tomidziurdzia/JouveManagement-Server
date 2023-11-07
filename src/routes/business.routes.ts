import { Router } from "express";
import {
  getBusinesses,
  postBusiness,
  putBusiness,
  deleteBusiness,
  getBusiness,
} from "../controllers";
import { checkAuth } from "../middleware";

const router: Router = Router();

router.route("/").get(getBusinesses).post(postBusiness);
router
  .route("/:id")
  .get(checkAuth, getBusiness)
  .put(checkAuth, putBusiness)
  .delete(checkAuth, deleteBusiness);

export default router;
