import { Router } from "express";
import { createLabour ,getLabours , getLabourById , updateLabour , deleteLabour , searchLabours} from "../controller/labourController";
import { authenticate } from "../middleware/auth";
import { Role } from "../models/userModel";
import { requireRole } from "../middleware/role";

const router = Router();

router.post(
  "/create",
  authenticate,
  requireRole([Role.ADMIN]),
  createLabour
);

router.get(
  "/getAll",
  authenticate,
  requireRole([Role.ADMIN]),
  getLabours
);

router.get(
  "/search",
  authenticate,
  requireRole([Role.ADMIN]),
  searchLabours
);


router.get(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  getLabourById
);

router.put(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  updateLabour
);

router.delete(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  deleteLabour
);


export default router;