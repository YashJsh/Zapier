import { Router} from "express"
import { authMiddleware } from "../middleware";
import { getAvailableTriggers } from "../controller/trigger.controller";

const router = Router();

router.get("/available", getAvailableTriggers);

export const triggerRouter = router;