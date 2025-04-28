"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        res.status(500).json({
            message: "Unauthorized",
        });
        return;
    }
    try {
        console.log("Reached");
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        console.log(payload);
        console.log("Payload is : ", payload);
        // @ts-ignore
        req.id = payload.id;
        next();
    }
    catch (error) {
        res.status(411).json({
            message: "Some Error Occurred",
            error
        });
    }
});
exports.authMiddleware = authMiddleware;
