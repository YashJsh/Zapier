"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerRouter = void 0;
const express_1 = require("express");
const trigger_controller_1 = require("../controller/trigger.controller");
const router = (0, express_1.Router)();
router.get("/available", trigger_controller_1.getAvailableTriggers);
exports.triggerRouter = router;
