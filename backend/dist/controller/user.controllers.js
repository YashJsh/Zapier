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
exports.changePassword = exports.User = exports.SignIn = exports.SignUp = void 0;
const types_1 = require("../types");
const client_1 = require("../client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedBody = types_1.signUpSchema.safeParse(body);
    if (!parsedBody.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }
    const userExists = yield client_1.prismaClient.user.findFirst({
        where: {
            email: parsedBody.data.email
        }
    });
    if (userExists) {
        res.status(403).json({
            message: "User Already exists"
        });
        return;
    }
    const hashedPassword = ((yield bcryptjs_1.default.hash(parsedBody.data.password, 8)).toString());
    const user = yield client_1.prismaClient.user.create({
        data: {
            name: parsedBody.data.name,
            email: parsedBody.data.email,
            password: hashedPassword
        }
    });
    if (!user) {
        res.status(500).json({
            message: "Error creation in database"
        });
        return;
    }
    const JWT_SECRET = process.env.JWT_SECRET || "secret123";
    const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET);
    res.status(200).json({
        message: 'User signed Up successfully',
        data: user,
        token: token
    });
    return;
});
exports.SignUp = SignUp;
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield client_1.prismaClient.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({
            message: "Invalid credentials"
        });
        return;
    }
    const JWT_SECRET = process.env.JWT_SECRET || "secret123";
    const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET);
    res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});
exports.SignIn = SignIn;
const User = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    if (!id) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }
    const user = yield client_1.prismaClient.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    });
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    res.status(200).json({
        user: user
    });
});
exports.User = User;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedBody = types_1.changePasswordSchema.parse(body);
    if (!parsedBody) {
        res.status(411).json({
            message: "Incorrect password schema"
        });
        return;
    }
    const id = req.id;
    const user = yield client_1.prismaClient.user.findFirst({
        where: {
            id: id
        }
    });
    if (!user) {
        res.status(411).json({
            message: "User not found"
        });
        return;
    }
    const checkpassword = yield bcryptjs_1.default.compare(body.currentPassword, user.password);
    if (!checkpassword) {
        res.status(411).json({
            message: "Current Password is incorrect"
        });
        return;
    }
    const encyptPassowrd = yield bcryptjs_1.default.hash(body.newPassword, 8);
    const updatePasswod = yield client_1.prismaClient.user.update({
        where: {
            id: id
        },
        data: {
            password: encyptPassowrd
        }
    });
    if (!updatePasswod) {
        res.status(500).json({
            message: "Unable to update password"
        });
    }
    res.status(200).json({
        message: "Password Updated successfully"
    });
});
exports.changePassword = changePassword;
