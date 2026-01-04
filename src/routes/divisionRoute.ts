import { Router } from "express";
import { createDivision , getAllDivisions , getDivisionById , updateDivision , deleteDivision , searchDivisions} from "../controller/divisionController";
import { authenticate } from "../middleware/auth";
import { Role } from "../models/userModel";
import { requireRole } from "../middleware/role";

const router = Router();

router.post(
    "/create",
    authenticate,
    requireRole([Role.ADMIN]),
    createDivision
);

router.get(
    "/",
    authenticate,
    requireRole([Role.ADMIN, Role.USER]),
    getAllDivisions
);

router.get(
    "/search",
    authenticate,
    requireRole([Role.ADMIN]),
    searchDivisions
);

router.get(
    "/:id",
    authenticate,
    requireRole([Role.ADMIN]),
    getDivisionById
);

router.put(
    "/:id",
    authenticate,
    requireRole([Role.ADMIN]),
    updateDivision
);

router.delete(
    "/:id",
    authenticate,
    requireRole([Role.ADMIN]),
    deleteDivision
);


export default router;