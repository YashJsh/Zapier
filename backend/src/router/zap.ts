import { Router } from "express";
import { authMiddleware } from "../middleware";
import { getSpecificZap, getZaps, ZapCreation } from "../controller/zap.controllers";

const router = Router();

router.post("/", authMiddleware, ZapCreation);
router.get("/", authMiddleware,  getZaps);
router.get("/:zapId", authMiddleware, getSpecificZap);

export const zapRouter = router;