import { Router } from "express";
import { createLabour ,getLabours , getLabourById , updateLabour , deleteLabour , searchLabours} from "../controller/labourController";
import { authenticate } from "../middleware/auth";
import { Role } from "../models/userModel";
import { requireRole } from "../middleware/role";

const router = Router();

router.post(
  "/create",
  authenticate,
  requireRole([Role.ADMIN, Role.USER]),
  createLabour
);

router.get(
  "/getAll",
  authenticate,
  requireRole([Role.ADMIN, Role.USER]),
  getLabours
);

router.get(
  "/search",
  authenticate,
  requireRole([Role.ADMIN, Role.USER]),
  searchLabours
);


router.get(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN, Role.USER]),
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