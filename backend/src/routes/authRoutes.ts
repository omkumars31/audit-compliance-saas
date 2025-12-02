import { Router } from "express";
import { login, Signup } from "../controllers/authControllers";

const router = Router();

router.post("/signup", Signup);
router.post("/login", login);

export default router;