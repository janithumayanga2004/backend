import { Router } from "express"
import {
  registerUser,login
} from "../controller/authController"

import { Role } from "../models/userModel"

const router = Router()


router.post("/register", registerUser)

router.post("/login", login)


export default router