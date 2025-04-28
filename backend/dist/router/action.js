"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionRouter = void 0;
const express_1 = require("express");
const action_controller_1 = require("../controller/action.controller");
const router = (0, express_1.Router)();
router.get("/available", action_controller_1.getAvailableActions);
exports.actionRouter = router;
