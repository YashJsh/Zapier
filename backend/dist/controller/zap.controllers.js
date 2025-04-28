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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificZap = exports.getZaps = exports.ZapCreation = void 0;
const types_1 = require("../types");
const client_1 = require("../client");
const ZapCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const body = req.body;
    const parsedData = types_1.ZapCreationSchema.safeParse(body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
    }
    yield client_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        // First creating a zap with the random trigger ID
        const zap = yield tx.zap.create({
            data: {
                userId: id,
                triggerId: "",
                actions: {
                    create: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.actions.map((x, index) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index
                    }))
                }
            }
        });
        const trigger = yield tx.trigger.create({
            data: {
                triggerId: (_b = parsedData.data) === null || _b === void 0 ? void 0 : _b.availableTriggerId,
                zapId: zap.id
            }
        });
        yield tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        });
        res.status(201).json({
            message: "Zap Created",
            zap: zap.id
        });
        return;
    }));
});
exports.ZapCreation = ZapCreation;
const getZaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const zaps = yield client_1.prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    if (!zaps) {
        res.status(411).json({
            message: "Database error"
        });
    }
    res.status(200).json({
        data: zaps
    });
});
exports.getZaps = getZaps;
const getSpecificZap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const zapId = req.params.zapId;
    const zap = yield client_1.prismaClient.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    if (!zap) {
        res.status(411).json({
            message: "Database error"
        });
    }
    res.status(200).json({
        data: zap
    });
});
exports.getSpecificZap = getSpecificZap;
