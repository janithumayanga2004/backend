import { Router } from "express";
import { createCategory, upload , getCategories, getCategoryById , updateCategory , deleteCategory , searchCategories} 
from "../controller/categoryController";
import { authenticate } from "../middleware/auth";
import { Role } from "../models/userModel";
import { requireRole } from "../middleware/role";

const router = Router();

router.post(
  "/create",
  authenticate,
  requireRole([Role.ADMIN ]),
  upload.single("photo"), 
  createCategory
);

router.get(
  "/getAll",
  authenticate,
  requireRole([Role.ADMIN ]),
  getCategories
);

router.get(
  "/search",
  authenticate,
  requireRole([Role.ADMIN]),
  searchCategories
);


router.get(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  getCategoryById
);

router.put(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  upload.single("photo"), 
  updateCategory
);

router.delete(
  "/:id",
  authenticate,
  requireRole([Role.ADMIN]),
  deleteCategory
);


export default router;
