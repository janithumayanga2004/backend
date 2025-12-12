import { Router } from "express";
import { markAttendance , getAttendanceByLabour , getAllAttendance , updateAttendance , searchAttendance , deleteAttendance} 
from "../controller/attendanceController";
import { authenticate } from "../middleware/auth";
import { Role } from "../models/userModel";
import { requireRole } from "../middleware/role";

const router = Router();

router.post(
  "/mark",
  authenticate,
  requireRole([Role.ADMIN]),
  markAttendance
);

router.get(
  "/search",
  authenticate,
  requireRole([Role.ADMIN, Role.USER]),
  searchAttendance
);


router.get(
  "/labour/:labourId",
  authenticate,
  requireRole([Role.ADMIN]),
  getAttendanceByLabour
);

router.get(
  "/all",
  authenticate,
  requireRole([Role.ADMIN]),
  getAllAttendance
);

router.put(
  "/update/:attendanceId",
  authenticate,
  requireRole([Role.ADMIN]),
  updateAttendance
);

router.delete(
  "/delete/:attendanceId",
  authenticate,
  requireRole([Role.ADMIN]),
  deleteAttendance
);

export default router;