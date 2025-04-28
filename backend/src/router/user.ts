import { Router } from "express";
import { authMiddleware } from "../middleware";
import { changePassword, SignIn, SignUp, User } from "../controller/user.controllers";

const router = Router();

router.post("/signup", SignUp);

router.post("/signin", SignIn);

router.get("/", authMiddleware,  User);

router.put("/changePassword", authMiddleware, changePassword);

export const userRouter = router;