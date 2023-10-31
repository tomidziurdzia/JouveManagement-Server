import { Router } from "express";
import {
  getBusinesses,
  postBusiness,
  getBusiness,
  putBusiness,
  deleteBusiness,
} from "../controllers";

const router: Router = Router();

router.get("/", getBusinesses);
router.post("/", postBusiness);
router.get("/:id", /*checkAuth,*/ getBusiness);
router.put("/:id", putBusiness);
router.delete("/:id", deleteBusiness);

export default router;
