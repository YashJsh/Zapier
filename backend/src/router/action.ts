import { Router} from "express"
import { authMiddleware } from "../middleware";
import { getAvailableActions } from "../controller/action.controller";

const router = Router();

router.get("/available",  getAvailableActions );

export const actionRouter = router;