import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getProfile);

export default router;
