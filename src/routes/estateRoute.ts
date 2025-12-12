import { Router } from "express";
import { createEstate , getEstates , getEstateById , updateEstate , deleteEstate , searchEstates } 
from "../controller/estateController";
import { authenticate } from "../middleware/auth";
import { Role } from "../models/userModel";
import { requireRole } from "../middleware/role";

const router = Router();

router.post(
  "/create",
  authenticate,
  requireRole([Role.ADMIN]),
  createEstate
)

router.get(
  "/",
  authenticate,
  requireRole([Role.ADMIN]),
  getEstates
)

router.get(
  "/search",
  authenticate,
  requireRole([Role.ADMIN]),
  searchEstates
)


router.get(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  getEstateById
)

router.put(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  updateEstate
)

router.delete(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  deleteEstate
)


export default router
