import { Router } from "express";
import { createHarvest , getAllHarvests , getHarvestById , updateHarvest , deleteHarvest , searchHarvests} 
from "../controller/harvestController";
import { authenticate } from "../middleware/auth";
import { Role } from "../models/userModel";
import { requireRole } from "../middleware/role";

const router = Router();

router.post(
    "/create",
    authenticate,
    requireRole([Role.ADMIN]),
    createHarvest
)

router.get(
    "/getAll",
    authenticate,
    requireRole([Role.ADMIN, Role.USER]),
    getAllHarvests
)

router.get(
    "/search",
    authenticate,
    requireRole([Role.ADMIN, Role.USER]),
    searchHarvests
);


router.get(
    "/:id",
    authenticate,
    requireRole([Role.ADMIN, Role.USER]),
    getHarvestById
)
router.put(
    "/:id",
    authenticate,
    requireRole([Role.ADMIN]),
    updateHarvest
)

router.delete(
    "/:id",
    authenticate,
    requireRole([Role.ADMIN]),
    deleteHarvest
)


export default router;