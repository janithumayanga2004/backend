import { Router } from "express";
import {createAgriculturalImplement , getAgriculturalImplements , getAgriculturalImplementById , 
    updateAgriculturalImplement , deleteAgriculturalImplement , searchAgriculturalImplements} 
from "../controller/agriculturalImplementsController";
import { authenticate } from "../middleware/auth";
import { Role } from "../models/userModel";
import { requireRole } from "../middleware/role";

const router = Router();

router.post("/create", 
    authenticate, 
    requireRole([Role.ADMIN]), 
    createAgriculturalImplement
);

router.get("/getAll", 
    authenticate, 
    requireRole([Role.ADMIN, Role.USER]), 
    getAgriculturalImplements
);

router.get("/search", 
    authenticate, 
    requireRole([Role.ADMIN, Role.USER]), 
    searchAgriculturalImplements
)

router.get("/:id", 
    authenticate, 
    requireRole([Role.ADMIN, Role.USER]), 
    getAgriculturalImplementById
);

router.put("/:id", 
    authenticate, 
    requireRole([Role.ADMIN]), 
    updateAgriculturalImplement
);

router.delete("/:id", 
    authenticate, 
    requireRole([Role.ADMIN]), 
    deleteAgriculturalImplement
);


export default router;